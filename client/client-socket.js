const socket = io();

var render = Render('board123');


// var adder = {
//   color: 'black',
//   newShapes: [
//     {
//       type: 'circle', //required STRING
//       points: [{x: 100, y: 100}], //required NUMBERS
//       radius: 100, //required NUMBER
//       strokeColor: 'green', //optional, default is black any valid css Color is ok
//       fillColor: 'green', //optional, if included circle will be filled
//       lineWidth: 2 //optional NUMBER, default is 1px
//     }
//   ]
// };

var tick = function tick() {
  var myDraw = {
    color: 'aliceBlue',
    newShapes: shapes
  };
  socket.emit('clientDrawing', myDraw);
};

socket.on('renderme', (serverData) => {
  render(serverData);
});
// socket.on('boardId', (data) => {
//   console.log(data);
// });

setInterval(tick, 100);

// socket.on('boardId', function (data) {
//   console.log(data);
//   socket.emit('clientDrawing', { clientSays: 'this message came through socket.io' });
// });
