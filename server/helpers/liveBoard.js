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