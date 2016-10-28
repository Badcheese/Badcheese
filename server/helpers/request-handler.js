const util = require('./utils.js');

module.exports = {

  logger: (req, res, next) => {
    console.log(`Serving ${req.method} request @ ${req.path}`);
    next();
  },

  getNewBoard: (req, res, next) => {
    const newId = util.doGenerateNewId();
    util.doGetNewBoard(newId);
    res.json(newId);
  },

  // getBoard: (req, res, next, boardId) => { TODO: call doGetBoard util },

  // archiveBoard: (req, res, next, archiveId) => { TODO: call doArchiveBoard util },

};
