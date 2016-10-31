import React from 'react';
import ToolBar from './Toolbar.jsx';
import Render from '../../render.js';
import initDrawer from '../../drawer.js';


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draw: null
    };
  }

  componentDidMount() {
    this.updateCanvas();
    const currentRoom = window.location.hash.slice(1);
    const socket = io();
    socket.emit('addMeToRoom', currentRoom);

    const drawer = initDrawer();
    this.setState({ draw: drawer });
    const render = Render('draw-canvas', drawer);

    var loadChange = function loadChange(serverData) {
      if (serverData.color) {
        drawer.data.color = serverData.color;
      }

      if (serverData.shapes) {
        for (var key in serverData.shapes) {
          var serverShape = serverData.shapes[key];
          drawer.data.shapes[key] = serverShape;
          drawer.data.remoteShapes = drawer.data.remoteShapes.filter(function(remoteShape) {
            return remoteShape.guid !== serverShape.guid;
          });
          if (serverShape.done) {
            drawer.data.updates ? 0 : drawer.data.updates = [];
            if (drawer.data.currentShape && (serverShape.guid === drawer.data.currentShape.guid)) {
              drawer.data.currentShape = null;
              serverShape.done = undefined;
              drawer.data.updates.push(serverShape);
            }
            if (drawer.data.modifiedShape && (serverShape.guid === drawer.data.modifiedShape.guid)) {
              drawer.data.modifiedShape = null;
              serverShape.done = undefined;
              drawer.data.updates.push(serverShape);
            }
          }
        }
      }

      if (serverData.currentShape) {
        if (!drawer.data.currentShape || (serverData.currentShape.guid !== drawer.data.currentShape.guid)) {
          drawer.data.remoteShapes = drawer.data.remoteShapes.filter(function (remoteShape) {
            return remoteShape.guid !== serverData.currentShape.guid;
          });
          drawer.data.remoteShapes.push(serverData.currentShape);
        }
      }
    };

    var tick = function tick() {
      var shapes = {};

      if (drawer.data.modifiedShape) {
        shapes[drawer.data.modifiedShape.id] = drawer.data.modifiedShape;
      }
      if (drawer.data.updates) {
        
        drawer.data.updates.forEach(function(update) {
          shapes[update.id] = update;
        });
        

        drawer.data.updates = [];
      }

      var myDraw = {
        color: 'aliceBlue',
        newShapes: drawer.data.newShapes,
        currentShape: drawer.data.currentShape,
        shapes: shapes
      };

      if (drawer.data.newShapes.length > 0) {
        drawer.data.newShapes = [];
      }

      socket.emit('clientDrawing', myDraw);
    };

    socket.on('renderme', (serverData) => {
      loadChange(serverData);
    });

    setInterval(tick, 100);
    window.requestAnimationFrame(render);

  }
  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, 750, 1000);
  }
  render() {
    const container = {
      marginLeft: '10%',
      paddingLeft: 30,
      position: 'fixed'
    };
    const canvas = {
      borderRadius: '5px',
    };
    const tools = {
      listStyleType: 'none',
      marginTop: '85px',
      position: 'fixed'
    };
    const header = {
      margin: '200px',
    };

    return (
        <div>
          <h1>Drawmie {window.location.hash}</h1>
          <h1><a style ={{color: '#681f03'}} href='/'>New Drawmie</a></h1>
          <div className="container-fluid" style={tools}>
            <ToolBar draw={ this.state.draw } />
          </div>
          <div className="container-fluid" style={container} >
            <canvas id="draw-canvas" style={canvas} ref="canvas" width={window.document.body.offsetWidth * .80} height={window.document.body.offsetHeight * .77} />
          </div>
        </div>
    );
  }
}

export default Board;
