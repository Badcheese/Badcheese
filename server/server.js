const express = require('express');
const path = require('path');
const app = require('express')();
const bodyParser = require('body-parser');
const handler = require('./helpers/request-handler.js');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const LiveBoard = require('./helpers/liveBoard.js');

const port = 3000;
// TODO: Will move routes to own module (routes.js)
// const router = require('.helpers/routes.js');

// When there is data to store
// mongoose.connect('mongodb://localhost/drawmie-dev');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(handler.logger);

// Serve Static Files for React
// app.use('/', express.static(path.join(__dirname, '..', 'src')));
app.use('/', express.static(path.join(__dirname, '..', 'client')));


// Params
// app.param('boardId', handler.getBoard);
// app.param('archiveId', handler.archiveBoard);

// Create a new board
app.get('/board', handler.getNewBoard);
//
// // Get a board by id
// app.get('/board/:boardId', handler.getBoard);
//
// // Archive board by id (Server to Server)
// app.post('board/:archiveId', handler.archiveBoard);

// Server Port
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

io.on('connection', (socket) => {
  const liveBoard = LiveBoard();
  socket.join('all');
  liveBoard.reset();
  socket.on('clientDrawing', (data) => {
    liveBoard.loadChange(data, function(changes) {
      io.to('all').emit('renderme', changes);
    });
  });
});
