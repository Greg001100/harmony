const express = require('express');
const morgan = require('morgan');
const path = require('path')
const db = require('./models')
const { ValidationError } = require("sequelize");
const cors = require("cors");
const bodyParser = require('body-parser');
const { createServer } = require('http');
const WebSocket = require('ws')

const {Message, User} = db;
const usersRouter = require("./routes/users")
const serverRouter = require("./routes/servers")

const app = express();
app.use(morgan('dev'));
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', usersRouter)
app.use('/servers', serverRouter)

const port = Number.parseInt(process.env.PORT, 10) || 8081;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('harmony_frontend/build'));
  app.get('/', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'harmony_frontend', 'build', 'index.html'));
  });
}


app.use((req, res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err instanceof ValidationError) {
    err.errors = err.errors.map((e) => e.message);
    err.title = "Sequelize Error";
  }
  next(err);
});

// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   const isProduction = environment === "production";
//   res.json({
//     title: err.title || "Server Error",
//     message: err.message,
//     errors: err.errors,
//     stack: isProduction ? null : err.stack,
//   });
// });

const server = createServer(app);
const wss = new WebSocket.Server({server})

wss.on('connection', (ws) => {
  ws.on('message', async (jsonData) => {
    console.log(`Processing incoming message ${jsonData}...`);

    const message = JSON.parse(jsonData);
    const {value, userId, channelId} = message.data
    const recMessage = await Message.create({value, userId, channelId})
    const chatMessage = await Message.findByPk(recMessage.id, {include:[User]})

    const addChatMessage = {
      type: 'add-chat-message',
      data: chatMessage,
    };
    const jsonAddChatMessage = JSON.stringify(addChatMessage);
    console.log(`Sending message ${jsonAddChatMessage}...`);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(jsonAddChatMessage);
      }
    });
  });

  ws.on('close', (e) => {
    console.log(e);
  });
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection success! Sequelize is ready to use...");

    server.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => {
    console.log("Database connection failure.");
    console.error(err);
  });
