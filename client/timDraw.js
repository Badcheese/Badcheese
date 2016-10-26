window.data = {
  color: 'aliceBlue',
  shapes: {}
};
data.shapes = {};
data.currentShape = null;
data.newShapes = [];
var canvas = document.getElementById('draw-canvas');
var ctx = canvas.getContext('2d');
var drawer = new Drawer(canvas, window.data);
var draw = function() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (var key in data.shapes) {
    var shape = data.shapes[key];
    ctx.lineWidth = shape.lineWidth;
    ctx.lineCap = shape.lineCap;
    ctx.lineJoin = shape.lineJoin;
    ctx.strokeStyle = shape.strokeColor;
    ctx.fillColor = shape.fillColor;
    ctx.beginPath();
  
    if (shape.type === ShapeTypes.path) {
      ctx.moveTo(shape.points[0].x, shape.points[0].y);
      for (var j = 1; j < shape.points.length; j++) {
        var point = shape.points[j];
        ctx.lineTo(point.x, point.y);
      }
    } else if (shape.type === ShapeTypes.rect && shape.points.length > 1) {
      ctx.moveTo(shape.points[0].x, shape.points[0].y);
      var p1 = shape.points[0];
      var p2 = shape.points[1];
      ctx.lineTo(p2.x, p1.y); // top right
      ctx.lineTo(p2.x, p2.y); // btm right
      ctx.lineTo(p1.x, p2.y); // btm left
      ctx.closePath();
    } else if (shape.type === ShapeTypes.circle) {
      var center = shape.points[0];
      ctx.arc(center.x, center.y, shape.radius, 0, 2 * Math.PI, false);
    } else if (shape.type === ShapeTypes.line && shape.points.length > 1) {
      var p1 = shape.points[0];
      var p2 = shape.points[1];
      ctx.lineTo(p1.x, p1.y); // top right
      ctx.lineTo(p2.x, p2.y); // btm right
      ctx.closePath();
    }
  
    if (ctx.fillColor) {
      ctx.fill();
    }
  
    ctx.stroke();
  }

  window.requestAnimationFrame(draw);
};
// window.requestAnimationFrame(draw);