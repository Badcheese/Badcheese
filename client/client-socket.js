const socket = io();

window.render = Render('draw-canvas');


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

var loadChange = function loadChange(serverData) {
  if (serverData.color) {
    window.data.color = serverData.color;
  }
  if (serverData.shapes) {
    for (var key in serverData.shapes) {
      data.shapes[key] = serverData.shapes[key];
    }
  }

  if (serverData.currentShape) {
    window.data.remoteShape = serverData.currentShape;
  }
};

var tick = function tick() {
  var myDraw = {
    color: 'aliceBlue',
    newShapes: data.newShapes,
    currentShape: data.currentShape
  };
  if (data.newShapes.length > 0) {
    data.newShapes = []; 
  }
  socket.emit('clientDrawing', myDraw);
};

socket.on('renderme', (serverData) => {
  loadChange(serverData);
});



setInterval(tick, 250);
window.requestAnimationFrame(render);

// socket.on('boardId', function (data) {
//   console.log(data);
//   socket.emit('clientDrawing', { clientSays: 'this message came through socket.io' });
// });
