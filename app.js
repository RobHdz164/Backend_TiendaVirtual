const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const http = require('body-parser');
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200).json({ message: 'Bienvenido a mi API de tienda virtual' 
}));

const server = http.createServer(app);
server.listen(port);
module.exports = app;