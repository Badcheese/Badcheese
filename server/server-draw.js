const express = require('express');
const bodyParser = require('body-parser');
const handler = require('./helpers/request-handler.js');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', express.static(__dirname));

// Server Port
server.listen(3005, () => {
  console.log('Server is up!');
});

// Send test index.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.emit('news', { serverSays: 'This message came through socket.io' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});

module.exports = app;
