const socket = io();

window.render = Render('draw-canvas');

var loadChange = function loadChange(serverData) {
  console.log('loadChange');

  if (serverData.color) {
    window.data.color = serverData.color;
  }

  if (serverData.shapes) {
    for (var key in serverData.shapes) {
      console.log('LOADING: ', serverData.shapes[key].id);
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

socket.on('boardId', function (data) {
  console.log(data);
  socket.emit('clientDrawing', { clientSays: 'this message came through socket.io' });
});
