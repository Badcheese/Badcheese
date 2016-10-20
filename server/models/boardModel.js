const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
  // TODO: TBT
});

const Board = mongoose.model('Board', BoardSchema);

module.exports = Board;
