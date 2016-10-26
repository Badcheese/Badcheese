const socket = io();

var render = Render('board123');

var rand = function(mult, add) {
  add ? 0 : add = 0;
  return Math.floor(Math.random() * mult + add);
};

var add = function() {
  var adder = {shapes: {}, newShapes: []};
  var id;
  var r;
  var width = 1000;
  var height = 750;
  for (var x = 0; x < 3; x++ ) {
    // localData ? 0 : localData = {shapes: {}};
    // id = rand(localData.next + 1);

    r = rand(5, 1);
    if (r === 1) {
      color = 'red';
    } else if (r === 2) {
      color = 'blue';
    } else if (r === 3) {
      color = 'green';
    } else if (r === 4) {
      color = 'yellow';
    } else if (r === 5) {
      color = 'purple';
    }

    r = rand(3, 1);
    if (r === 1) {
      adder.newShapes.push({
        type: 'circle',
        points: [
          {
            x: rand(width, 100),
            y: rand(height, 100)
          }
        ],
        strokeColor: color,
        radius: rand(200, 1)
      });
    } else if (r === 2) {
      adder.newShapes.push({
        type: 'box',
        points: [
          {
            x: rand(width),
            y: rand(height)
          },
          {
            x: rand(width),
            y: rand(height)
          }
        ],
        strokeColor: color,
        // alpha: Math.random() * 2 * Math.PI
      });
    } else if (r === 3) {
      adder.newShapes.push({
        type: 'line',
        strokeColor: color,
        points: [
        {x: rand(width), y: rand(height)},
        {x: rand(width), y: rand(height)},
        {x: rand(width), y: rand(height)},
        {x: rand(width), y: rand(height)},
        {x: rand(width), y: rand(height)},
        {x: rand(width), y: rand(height)},
        {x: rand(width), y: rand(height)},
        {x: rand(width), y: rand(height)},
        {x: rand(width), y: rand(height)},
        {x: rand(width), y: rand(height)},
        {x: rand(width), y: rand(height)},
        {x: rand(width), y: rand(height)},
        {x: rand(width), y: rand(height)},
        {x: rand(width), y: rand(height)},
        {x: rand(width), y: rand(height)}
        ]
      });
    }

    // r = rand(6);
    // if (r === 0) {
    //   adder.shapes[id].fillColor = adder.shapes[id].strokeColor;
    // }
  }

  socket.emit('clientDrawing', adder);
};
socket.on('renderme', (serverData) => {
  render(serverData);
});
// socket.on('boardId', (data) => {
//   console.log(data);
// });

// c.canvas.width = window.innerWidth;
// c.canvas.height = window.innerHeight;

var t0;
var t1;

setInterval(function() {
  t0 = performance.now();
  add();
  t1 = performance.now();
  // console.log(`Rendered ${localData.next} items in ${t1 - t0} milliseconds!`);
}, 1000);

// socket.on('boardId', function (data) {
//   console.log(data);
//   socket.emit('clientDrawing', { clientSays: 'this message came through socket.io' });
// });
