const mongoose = require('mongoose');
const Board = require('../models/boardModel.js');
const LiveBoard = require('./liveBoard');

// Replace mongoose's outdated Promise library
mongoose.Promise = Promise;

// Board Related
const boards = [];

module.exports = {

  doGetNewBoard: (id) => {
    const board = LiveBoard();
    boards.push({ id, board });
  },

  // doGetBoard: (id) => { TODO: gets an existing board },

  // doArchiveBoard: () => { TODO: archives a finished board },

  doGenerateNewId: () => { return Math.floor(Math.random() * 999 + 1); },

};
