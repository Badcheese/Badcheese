const express = require('express');
const bodyParser = require('body-parser');
const handler = require('./helpers/request-handler.js');

const app = express();

// When there is data to store
// mongoose.connect('mongodb://localhost/drawmie-dev');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// TODO: Set this to correct static file path to front end:
// app.use('/', express.static(path.join(__dirname, '..', 'src')));

// Params
// app.param('param-name', param-handler);

// Routes
// app.get('/', appropriate-request-handler);

// Server Port
app.listen(3000);

module.exports = app;
