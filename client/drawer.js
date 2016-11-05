var initDrawer = function initDrawer() {
  var data = {
    color: 'aliceBlue',
    shapes: {},
    currentShape: null,
    newShapes: [],
    modifiedShape: null,
    remoteShapes: []
  };

  var ShapeTypes = {line: 'line', path: 'path', rect: 'rect', circle: 'circle'};
  var LineTypes = {round: 'round'};
  var Colors = {black: 'black', red: 'red', blue: 'blue', green: 'green', purple: 'purple', yellow: 'yellow', white: 'white', aliceblue: 'aliceblue'};

  //returns 4 digit guid string
  var getGuid = function getGuid() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    var codes = [0, 0, 0, 0];

    codes = codes.map(function (code) {
      return chars[Math.floor(Math.random() * chars.length)];
    });

    return codes.join('');
  };

  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }

  class Shape {
    constructor(type, points, strokeColor, fillColor) {
      this.type = type;
      this.points = points;
      this.radius = 0;
      this.lineWidth = 2;
      this.lineJoin = LineTypes.round;
      this.lineCap = LineTypes.round;
      this.strokeColor = strokeColor;
      this.fillColor = fillColor;
      this.guid = getGuid();
    }
  }

  class Drawer {

    constructor(canvas, data) {
      this.canvas = canvas;
      // this.shapes = shapes;
      this.data = data;
      data = this.data;
      this.isDrawing = false;
      this.currentShapeType = ShapeTypes.path;
      this.isSelecting = false;
      this.ShapeTypes = ShapeTypes;
      this.LineTypes = LineTypes;
      this.Colors = Colors;
      this.fillColor = null;
      this.strokeColor = Colors.red;
      this.colorStroke = 'stroke';
      // keep this last so state is setup to hanlde drawing
      this.addListeners();
    }

    changeShapeType(type) {
      if (this.isSelecting) {
        this.toggleIsSelecting();
      }

      this.currentShapeType = type;
    }

    toggleStrokeFill(type) {
      this.colorStroke = type;
      this.changeColor(this.strokeColor || this.fillColor);
    }

    changeColor(color) {
      if (this.colorStroke === 'stroke') {
        this.strokeColor = color;
        this.fillColor = null;
      } else {
        this.fillColor = color;
        this.strokeColor = null;
      }
    }

    enableIsSelecting() {
      this.isSelecting = true;
      this.canvas.style.cursor = 'pointer';
    }

    disableIsSelecting() {
      this.isSelecting = false;
      this.canvas.style.cursor = 'default';
    } 

    toggleIsSelecting() {
      if (this.isSelecting) {
        this.disableIsSelecting();
      } else {
        this.enableIsSelecting();
      }
    }

    getSelectedShape(mousePoint) {
      var selectedShape = null;

      for (var key in this.data.shapes) {
        var shape = this.data.shapes[key];
        var test = false;

        if (shape.type === ShapeTypes.rect && shape.points.length > 1) {
          var p1 = shape.points[0];
          var p2 = shape.points[1];
          
          if (mousePoint.x > p1.x && mousePoint.x < p2.x || mousePoint.x < p1.x && mousePoint.x > p2.x) {
            if (mousePoint.y > p1.y && mousePoint.y < p2.y || mousePoint.y < p1.y && mousePoint.y > p2.y) {
              test = true;
            }
          }


        } else if (shape.type === ShapeTypes.circle) {
          // pythagorean theorem
          var center = shape.points[0];
          var a = mousePoint.x - center.x;
          var b = mousePoint.y - center.y;
          var hyp = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
          test = hyp < shape.radius;
        }

        if (test) {
          selectedShape = shape;

          if (selectedShape.type === ShapeTypes.circle) {
            selectedShape.offsetX = a;
            selectedShape.offsetY = b;
          }
          if (selectedShape.type === ShapeTypes.rect) {
            selectedShape.offsetX = mousePoint.x - p1.x;
            selectedShape.offsetY = mousePoint.y - p1.y;
          }
          
          break;
        }
      }

      this.data.modifiedShape = selectedShape;
    }

    moveSelectedShape(mousePoint) {
      var shape = this.data.modifiedShape;

      if (!shape) {
        return;
      }

      if (shape.type === ShapeTypes.rect) {
        var p1 = shape.points[0];
        var p2 = shape.points[1];
        var width = p2.x - p1.x;
        var height = p2.y - p1.y;

        p1.x = mousePoint.x - shape.offsetX;
        p1.y = mousePoint.y - shape.offsetY;
        p2.x = p1.x + width;
        p2.y = p1.y + height;
      } else if (shape.type === ShapeTypes.circle) {
        shape.points[0].x = mousePoint.x - shape.offsetX;
        shape.points[0].y = mousePoint.y - shape.offsetY;
      }
    }

    // mouse events & helpers ###########

    getMousePoint(e) {
      var rect = this.canvas.getBoundingClientRect();
      // get the mouse point and remove offset of canvas in window
      var x = (e.clientX - rect.left) / (rect.right - rect.left) * this.canvas.width;
      var y = (e.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.height;
      return new Point(x, y);
    }

    handleMouseUp(e) {
      this.isDrawing = false;

      if (this.isSelecting) {
        if (this.data.modifiedShape) {
          this.data.modifiedShape.done = true;
        }
        return;
      }

      var shape = this.data.currentShape;

      if (!shape) {
        return;
      }

      if (shape && (shape.mode === ShapeTypes.rect || shape.mode === ShapeTypes.line)) {
        if (shape.points.length > 1) {
          shape.points.pop();
        }
        var point = this.getMousePoint(e);
        shape.points.push(point);
      }

      shape.done = true;
      this.data.newShapes.push(shape);
      // this.data.currentShape = null;

      console.log('SHAPE COUNT: ', this.data.newShapes.length);
    }

    handleMouseDown(e) {
      this.isDrawing = true;
      var mousePoint = this.getMousePoint(e);

      // if we are selecting
      if (this.isSelecting) {
        this.getSelectedShape(mousePoint);
        return;
      }

      var points = [mousePoint];
      this.data.currentShape = new Shape(this.currentShapeType, points,
        this.strokeColor, this.fillColor);

      // this.shapes.push(this.currentShape);
    }

    handleMouseMove(e) {

      if (!this.isDrawing) { return; }
      var mousePoint = this.getMousePoint(e);
      var shape = this.data.currentShape;

      if (this.isSelecting) {
        this.moveSelectedShape(mousePoint);
        return;
      }

      if (shape.type === ShapeTypes.path) {
        // paths get every point of move
        shape.points.push(mousePoint);
      } else if (shape.type === ShapeTypes.rect) {
        // rect's only have 2 points max
        if (shape.points.length > 1) {
          shape.points.pop();
        }

        shape.points.push(mousePoint);
      } else if (shape.type === ShapeTypes.circle) {
        // circles have one center point and a radius
        var center = shape.points[0];
        var distX = mousePoint.x - center.x;
        var distY = mousePoint.y - center.y;
        shape.radius = Math.abs(distX > distY ? distX : distY);
      } else if (shape.type === ShapeTypes.line) {
        // lines have 2 points max
        if (shape.points.length > 1) {
          shape.points.pop();
        }

        shape.points.push(mousePoint);
      }
    }

    addListeners() {
      this.canvas.addEventListener('mousedown',
        this.handleMouseDown.bind(this));
      this.canvas.addEventListener('mouseup',
        this.handleMouseUp.bind(this));
      this.canvas.addEventListener('mouseout',
        this.handleMouseUp.bind(this));
      this.canvas.addEventListener('mousemove',
        this.handleMouseMove.bind(this));
    }
  }

  var canvas = document.getElementById('draw-canvas');

  return new Drawer(canvas, data);
};

export default initDrawer;
