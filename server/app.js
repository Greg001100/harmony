const express = requrie('express');
const morgan = require('morgan');
const path = require('path')

const app = express();
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Hola Mundo');
})

const port = Number.parseInt(process.env.PORT, 10) || 8081;
app.listen(port, () => {
    console.log(`Listening for requests on port ${port}...`);
});
