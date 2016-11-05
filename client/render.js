var Render = function Render(canvasId, drawer) {
  const id = canvasId;
  const CIRCLE = 'circle';
  const LINE = 'path';
  const BOX = 'rect';
  const VECTOR = 'line';
  const c = document.getElementById(id).getContext('2d');
  const height = c.canvas.height;
  const width = c.canvas.width;
  var lastRender;

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
    if (shape.points.length === 1) {
      return;
    }

    c.beginPath();
    addStyle(shape);
    var x1 = shape.points[0].x;
    var y1 = shape.points[0].y;
    var x2 = shape.points[1].x;
    var y2 = shape.points[1].y;

    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.stroke();
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
    if (shape.points.length === 1) {
      return;
    }
    
    c.beginPath();
    addStyle(shape);

    var x0 = shape.points[0].x;
    var y0 = shape.points[0].y;
    var x2 = shape.points[1].x;
    var y2 = shape.points[1].y;

    c.moveTo(x0, y0);
    c.lineTo(x0, y2);
    c.lineTo(x2, y2);
    c.lineTo(x2, y0);
    c.lineTo(x0, y0);
    shape.fillColor ? c.fill() : c.stroke();
    c.closePath();
  };

  var addBackground = function(data) {
    c.clearRect(0, 0, c.canvas.width, c.canvas.height);
    // box({points: [{x: 0, y: 0}, {x: width, y: height}], fillColor: (localData.color || 'white')});
  };

  var addStyle = function addStyle(shape) {
    if (shape.strokeColor) {
      c.strokeStyle = shape.strokeColor;
    } else {
      c.strokeStyle = 'black';
    }
    if (shape.fillColor) {
      c.strokeStyle = c.fillStyle = shape.fillColor;
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

  var areEqual = function areEqual(a, b) {
    return JSON.stringify(a) === b;
  };

  var noChange = function noChange(data) {
    if (areEqual(data, lastRender)) {
      return true;
    }
    lastRender = JSON.stringify(data);
    return false;
  };
  
  // the render function takes in a data object.
  // Data has a shapes property which is an array
  // of all the shapes that need to be drawn.
  // It can also have a color property to define background color.
  return function render() {

    var localData = {
      color: drawer.data.color,
      shapes: drawer.data.shapes,
      currShape: drawer.data.currentShape,
      remoteShapes: drawer.data.remoteShapes,
      modifiedShape: drawer.data.modifiedShape
    };

    if (noChange(localData)) {
      return window.requestAnimationFrame(render);
    }

    addBackground(localData);

    for (var shapeKey in localData.shapes) {
      var shape = localData.shapes[shapeKey];

      if (!shape) {
        continue;
      }

      var currShape = localData.currShape;
      var modifiedShape = localData.modifiedShape;
      if (currShape && currShape.guid === shape.guid) {
        continue;
      }
      if (modifiedShape && modifiedShape.guid === shape.guid) {
        continue;
      }

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

    var currShape = localData.currShape;
    if (currShape) {
      if (currShape.type === CIRCLE) {
        circle(currShape);
      } else if (currShape.type === LINE) {
        line(currShape);
      } else if (currShape.type === BOX) {
        box(currShape);
      } else if (currShape.type === VECTOR) {
        vector(currShape);
      }
    }

    var modifiedShape = localData.modifiedShape;
    if (modifiedShape) {
      if (modifiedShape.type === CIRCLE) {
        circle(modifiedShape);
      } else if (modifiedShape.type === LINE) {
        line(modifiedShape);
      } else if (modifiedShape.type === BOX) {
        box(modifiedShape);
      } else if (modifiedShape.type === VECTOR) {
        vector(modifiedShape);
      }
    }

    var remoteShapes = localData.remoteShapes;
    remoteShapes.forEach(function (remoteShape) {
      if (remoteShape) {
        if (remoteShape.type === CIRCLE) {
          circle(remoteShape);
        } else if (remoteShape.type === LINE) {
          line(remoteShape);
        } else if (remoteShape.type === BOX) {
          box(remoteShape);
        } else if (remoteShape.type === VECTOR) {
          vector(remoteShape);
        }
      }
    });

    window.requestAnimationFrame(render);
  };
};

export default Render;