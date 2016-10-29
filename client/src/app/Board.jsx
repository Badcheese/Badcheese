import React from 'react';
import ToolBar from './ToolBar.jsx';
import Nav from './Nav.jsx';
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
          console.log("server shape: ", serverShape.guid);
          drawer.data.shapes[key] = serverData.shapes[key];
        }
      }

      if (serverData.currentShape) {
        drawer.data.remoteShape = serverData.currentShape;
      }
    };

    var tick = function tick() {
      var shapes = {};

      if (drawer.data.modifiedShape) {
        shapes[drawer.data.modifiedShape.id] = drawer.data.modifiedShape;
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

    setInterval(tick, 250);
    window.requestAnimationFrame(render);

    // socket.on('boardId', function (data) {
    //   console.log(data);
    //   socket.emit('clientDrawing', { clientSays: 'this message came through socket.io' });
    // });

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
      border: '15px solid gray',
      borderRadius: '5px',
    };
    const tools = {
      listStyleType: 'none',
      marginTop: '85px',
      position: 'fixed'
    };
    const nav = {
      marginLeft: '-25px',
      color: 'red'
    };
    const header = {
      margin: '0 0 0 0'
    };

    return (
      <div>
        <h1 style={header}><a href="/">Drawmie</a></h1>
        <div>
          <div className="container-fluid" style={tools}>
            <ToolBar draw={ this.state.draw } />
          </div>
            <Nav style={nav}/>
          <div className="container-fluid" style={container} >
            <canvas id="draw-canvas" style={canvas} ref="canvas" width={window.document.body.offsetWidth * .80} height={window.document.body.offsetHeight * .77} />
          </div>
        </div>
      </div>
    );
  }
}

export default Board;


          
