const express = require('express');
const bodyParser = require('body-parser');
const handler = require('./helpers/request-handler.js');

const app = express();

// When there is data to store
// mongoose.connect('mongodb://localhost/drawmie-dev');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Params
// app.param('param-name', param-handler);

// Routes
// app.get('/', appropriate-request-handler);

// Server Port
app.listen(3001);

module.exports = app;
