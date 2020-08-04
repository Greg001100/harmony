const express = require('express');
const morgan = require('morgan');
const path = require('path')
const db = require('./models')
const { ValidationError } = require("sequelize");
const cors = require("cors");
const bodyParser = require('body-parser');

const usersRouter = require("./routes/users")

const app = express();
app.use(morgan('dev'));
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', usersRouter)

const port = Number.parseInt(process.env.PORT, 10) || 8081;

app.get('/', (req, res) => {
    res.send('Hola Mundo');
})

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

//   app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     const isProduction = environment === "production";
//     res.json({
//       title: err.title || "Server Error",
//       message: err.message,
//       errors: err.errors,
//       stack: isProduction ? null : err.stack,
//     });
//   });

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection success! Sequelize is ready to use...");

    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err) => {
    console.log("Database connection failure.");
    console.error(err);
  });
