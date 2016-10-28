const mongoose = require('mongoose');
const Board = require('../models/boardModel.js');
const LiveBoard = require('./liveBoard');

// Replace mongoose's outdated Promise library
mongoose.Promise = Promise;

// Board Related
const boards = {};

module.exports = {

  doGetNewBoard: (id) => {
    const board = LiveBoard();
    boards[id] = board;
  },

  doGetBoard: (id) => { return boards[id]; },

  // doArchiveBoard: () => { TODO: archives a finished board },

  doGenerateNewId: () => { return Math.floor(Math.random() * 999 + 1); },

};
