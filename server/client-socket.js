const socket = io();

var canvasId = 'board123';
var width = 1000;
var height = 750;

const CIRCLE = 'circle';
const LINE = 'line';
const BOX = 'box';
const VECTOR = 'vector';
var canvas;
var height;
var width;
var c;

var localData;

// the render function takes in a data object.
// Data has a shapes property which is an array
// of all the shapes that need to be drawn.
// It can also have a color property to define background color.
window.render = function render(canvasId, change) {
  canvas = document.getElementById(canvasId);
  c = canvas.getContext('2d');
  height = canvas.height;
  width = canvas.width;

  loadChange(change);

  addBackground(localData);

  for (var shapeKey in localData.shapes) {
    var shape = localData.shapes[shapeKey];
    var type = shape.type;
    if (type === CIRCLE) {
      circle(shape);
    } else if (type === LINE) {
      line(shape);
    } else if (type === BOX) {
      box(shape);
    } else if (type === VECTOR) {
      vector(shape);
    }
  }
};

var loadChange = function loadChange(change) {
  if (!localData) {
    localData = change;
    if (!localData.next) {
      localData.next = 0;
    }
  } else {
    for (var key in change) {
      if (key !== 'shapes') {
        localData[key] = change[key];
      } else {
        var changeShapes = change[key];
        var localShapes = localData[key];
        localData.next ? 0 : localData.next = 0;
        for (var shapeId in changeShapes) {
          if (!localShapes[shapeId] && +shapeId === localData.next) {
            localData.next++;
          }
          localShapes[shapeId] = changeShapes[shapeId];
        }
      }
    }
  }
};

// {
//   type: 'circle', //required STRING
//   points: [{x, y}], //required NUMBERS
//   radius: 'radius', //required NUMBER
//   strokeColor: 'cssColor', //optional, default is black any valid css Color is ok
//   fillColor: 'cssColor', //optional, if included circle will be filled
//   lineWidth: 'width' //optional NUMBER, default is 1px
// }
var circle = function circle(shape) {
  c.beginPath();
  addStyle(shape);
  var x = shape.points[0].x;
  var y = shape.points[0].y;
  var r = shape.radius;

  c.arc(x, y, r, 0, 2 * Math.PI);
  shape.fillColor ? c.fill() : c.stroke();
  c.closePath();
};

// {
//   type: 'line', //required STRING
//   points: [{x, y}, {x, y}, {x, y}], //required n-x-tuple array, values should be integers, each object should have 'x' and 'y' property
//   strokeColor: 'cssColor', //optional, default is black any valid css Color is ok
//   lineJoin: 'type', //optional STRING, default is 'round'
//   lineCap: 'type', //optional STRING, default is 'round'
//   lineWidth: 'width' //optional NUMBER, default is 1px
// }
var line = function line(shape) {

  c.beginPath();
  addStyle(shape);

  if (shape.points.length > 0) {
    var x = shape.points[0].x;
    var y = shape.points[0].y;
    c.moveTo(x, y);
  }
  shape.points.forEach(function (point) {
    x = point.x;
    y = point.y;
    c.lineTo(x, y);
  });
  c.stroke();
  c.closePath();
};

// { //vector type might be unnecessary, as it is just a 2 point line
//   type: 'vector', //required STRING
//   points: [{x, y}, {x, y}], //required 2-x-tuple array, values should be integers, each object should have 'x' and 'y' property
//   strokeColor: 'cssColor', //optional, default is black any valid css Color is ok
//   lineJoin: 'type', //optional STRING, default is 'round'
//   lineCap: 'type', //optional STRING, default is 'round'
//   lineWidth: 'width' //optional NUMBER, default is 1px
// }
var vector = function vector(shape) {
  c.beginPath();
  addStyle(shape);
  var x1 = shape.points[0].x;
  var y1 = shape.points[0].y;
  var x2 = shape.points[1].x;
  var y2 = shape.points[1].y;

  c.moveTo(x1, y1);
  c.lineTo(x2, y2);
  c.closePath();
};

// {
//   type: 'box', //required STRING
//   points: [{x, y}, {x, y}], //required 2-x-tuple array, values should be integers, each object should have 'x' and 'y' property
//   strokeColor: 'cssColor', //optional, default is black any valid css Color is ok
//   fillColor: 'cssColor', //optional, if included box will be filled
//   lineJoin: 'type', //optional STRING, default is 'round'
//   lineCap: 'type', //optional STRING, default is 'round'
//   lineWidth: 'width' //optional NUMBER, default is 1px
// }
var box = function box(shape) {
  c.beginPath();
  addStyle(shape);

  var x0 = shape.points[0].x;
  var y0 = shape.points[0].y;
  var x2 = shape.points[1].x;
  var y2 = shape.points[1].y;
  var x1, y1, x3, y3;

  shape.alpha ? 0 : shape.alpha = 0;

  // var a = x2 - x0;
  // var b = y2 - y0;
  // var theta = Math.atan(b / a) + shape.alpha;
  // var rad = Math.sqrt(Math.pow(x2 - x0, 2) + Math.pow(y2 - y0, 2));
  // var x = (x0 + x2) / 2;
  // var y = (y0 + y2) / 2;
  // x0 = x - rad / 2 * Math.cos(theta);
  // x1 = x - rad / 2 * Math.cos(theta + Math.PI);
  // x2 = x + rad / 2 * Math.cos(theta);
  // x3 = x + rad / 2 * Math.cos(theta + Math.PI);
  // y0 = y - rad / 2 * Math.sin(theta);
  // y1 = y - rad / 2 * Math.sin(theta + Math.PI);
  // y2 = y + rad / 2 * Math.sin(theta);
  // y3 = y + rad / 2 * Math.sin(theta + Math.PI);


  c.moveTo(x0, y0);
  c.lineTo(x0, y2);
  c.lineTo(x2, y2);
  c.lineTo(x2, y0);
  c.lineTo(x0, y0);
  shape.fillColor ? c.fill() : c.stroke();
  c.closePath();
};

var addBackground = function(data) {
  box({points: [{x: 0, y: 0}, {x: width, y: height}], fillColor: (localData.color || 'white')});
};

var addStyle = function addStyle(shape) {
  if (shape.strokeColor) {
    c.strokeStyle = shape.strokeColor;
  } else {
    c.strokeStyle = 'black';
  }
  if (shape.fillColor) {
    c.fillStyle = shape.fillColor;
  } else {
    c.fillStyle = 'black';
  }
  if (shape.lineJoin) {
    c.lineJoin = shape.lineJoin;
  } else {
    c.lineJoin = 'round';
  }
  if (shape.lineCap) {
    c.lineCap = shape.lineCap;
  } else {
    c.lineCap = 'round';
  }
  if (shape.lineWidth) {
    c.lineWidth = shape.lineWidth;
  } else {
    c.lineWidth = 1;
  }
};

var rand = function(mult, add) {
  add ? 0 : add = 0;
  return Math.floor(Math.random() * mult + add);
};

var add = function() {
  var adder = {shapes: {}};
  var id;
  var r;
  for (var x = 0; x < 3; x++ ) {
    // localData ? 0 : localData = {shapes: {}};
    // id = rand(localData.next + 1);
    id = rand(4);

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
      adder.shapes[id] = {
        type: 'circle',
        points: [
          {
            x: rand(width, 100),
            y: rand(height, 100)
          }
        ],
        strokeColor: color,
        radius: rand(200, 1)
      };
    } else if (r === 2) {
      adder.shapes[id] = {
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
      };
    } else if (r === 3) {
      adder.shapes[id] = {
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
      };
    }

    r = rand(6);
    if (r === 0) {
      adder.shapes[id].fillColor = adder.shapes[id].strokeColor;
    }
  }

  // render(canvasId, adder);
  socket.emit('clientDrawing', adder);
};

socket.on('renderme', (data) => {
  render(canvasId, data);
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
