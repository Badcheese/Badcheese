const express = require('express');
const path = require('path');
const app = require('express')();
const bodyParser = require('body-parser');
const handler = require('./helpers/request-handler.js');
const server = require('http').Server(app);
const io = require('socket.io')(server);

// TODO: Will move routes to own module (routes.js)
// const router = require('.helpers/routes.js');

// When there is data to store
// mongoose.connect('mongodb://localhost/drawmie-dev');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve Static Files for React
// app.use('/', express.static(path.join(__dirname, '..', 'src')));
app.use('/', express.static(path.join(__dirname)));


// Params
// app.param('boardId', handler.getBoard);
// app.param('archiveId', handler.archiveBoard);

// Routes
// REVIEW: Serve index.html from project root?
app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, '..', 'index.html'));
  res.sendFile(path.join(__dirname, 'index.html'));

});

// Create a new board
// app.get('/board', handler.getNewBoard);
//
// // Get a board by id
// app.get('/board/:boardId', handler.getBoard);
//
// // Archive board by id (Server to Server)
// app.post('board/:archiveId', handler.archiveBoard);

// Server Port
// app.listen(3000, () => {
//   console.log('HTTP is up!');
// });
server.listen(3005, () => {
  console.log('Socket is up!');
});

// const nsp = io.of('/test');

io.on('connection', (socket) => {
  socket.join('test');
  io.to('test').emit('boardId', { dummy: 'data' });
  socket.on('clientDrawing', (data) => {
    console.log('got data from the client');
    io.to('test').emit('renderme', data);
  });
});

// io.on('clientDrawing', (data) => {
//   console.log('got data from the client');
//   // socket.join('test');
//   io.to('test').emit('renderme', data);
// });



module.exports = app;
