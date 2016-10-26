const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  color: { type: String, default: 'white' },
  next: { type: Number, default: 0 },
  shapes: Object,
});

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
