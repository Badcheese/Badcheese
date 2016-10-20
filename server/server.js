const app = require('express')();
const bodyParser = require('body-parser');
const handler = require('./helpers/request-handler.js');
// TODO: Will move routes to own module (routes.js)
// const router = require('.helpers/routes.js');

// When there is data to store
// mongoose.connect('mongodb://localhost/drawmie-dev');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve Static Files for React
app.use('/', express.static(path.join(__dirname, '..', 'src')));

// Params
app.param('boardId', handler.getBoard);
app.param('archiveId', handler.archiveBoard);

// Routes
// TODO: Serve index.html from project root?
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Create a new board
app.get('/board', handler.getNewBoard);

// Get a board by id
app.get('/board/:boardId', handler.getBoard);

// Archive board by id
app.post('board/:archiveId', handler.archiveBoard);

// Server Port
app.listen(3000);

module.exports = app;
