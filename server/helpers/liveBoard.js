module.exports = {
  board: {
    color: 'white',
    shapes: {},
    next: 0
  },

  loadChange: function loadChange(change) {
    if (change.color) {
      this.board.color = change.color;
    }
    let clientShapes = change.shapes;
    let serverShapes = this.board.shapes;
    for (const shapeId in clientShapes) {
      serverShapes[shapeId] = clientShapes[shapeId];
    }
    if (change.newShapes) {
      change.newShapes.forEach((shape) => {
        this.board.shapes[this.board.next] = shape;
        this.board.next++;
      });
    }
  }
};

/* EXAMPLE CHANGE
var Examplechange = {
  
  color: cssColor, //this is optional, if included it will change the background of the board to the provided color. Otherwhise the background will stay the same as it is.  
  
  shapes: { //this is optional, changes to existing shapes go here
    0: {
      type: 'circle', //required STRING
      points: [{x, y}], //required NUMBERS
      radius: 'radius', //required NUMBER
      strokeColor: 'cssColor', //optional, default is black any valid css Color is ok
      fillColor: 'cssColor', //optional, if included circle will be filled
      lineWidth: 'width' //optional NUMBER, default is 1px
    }
  },

  newShapes: [ //shapes you want to add go here.
    {
      type: 'line', //required STRING
      points: [{x, y}, {x, y}, {x, y}], //required n-x-tuple array, values should be integers, each object should have 'x' and 'y' property
      strokeColor: 'cssColor', //optional, default is black any valid css Color is ok
      lineJoin: 'type', //optional STRING, default is 'round'
      lineCap: 'type', //optional STRING, default is 'round'
      lineWidth: 'width' //optional NUMBER, default is 1px
    },
    {
      type: 'box', //required STRING
      points: [{x, y}, {x, y}], //required 2-x-tuple array, values should be integers, each object should have 'x' and 'y' property
      strokeColor: 'cssColor', //optional, default is black any valid css Color is ok
      fillColor: 'cssColor', //optional, if included box will be filled      
      lineJoin: 'type', //optional STRING, default is 'round'
      lineCap: 'type', //optional STRING, default is 'round'
      lineWidth: 'width' //optional NUMBER, default is 1px
    },
    { //vector type might be unnecessary, as it is just a 2 point line
      type: 'vector', //required STRING
      points: [{x, y}, {x, y}], //required 2-x-tuple array, values should be integers, each object should have 'x' and 'y' property
      strokeColor: 'cssColor', //optional, default is black any valid css Color is ok
      lineJoin: 'type', //optional STRING, default is 'round'
      lineCap: 'type', //optional STRING, default is 'round'
      lineWidth: 'width' //optional NUMBER, default is 1px
    }
  ]
};
*/