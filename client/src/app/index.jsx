import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './Nav.jsx';
import ToolBar from './ToolBar.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // This line is important!
  }
  componentDidMount() {
         this.updateCanvas();
  }
  updateCanvas() {
    const ctx = this.refs.canvas.getContext('2d');
    ctx.clearRect(0, 0, 750, 1000);
  }
  render() {
    const container = {
      marginLeft: '30%',
      paddingLeft: 30,
      
      position: 'fixed'
    };
    const canvas = {
      border: '15px solid gray',
      borderRadius: '5px' ,
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

    return (
      <div>
        <div className="container-fluid" style={tools}>
          <ToolBar />
        </div>
          <Nav style={nav}/>
        <div className="container-fluid" style={container} >
          <canvas id="draw-canvas" style={canvas} ref="canvas" width={500} height={500} />
        </div>
      </div>
      );
  }
}

export default App;

ReactDOM.render(<App cool={"really boring text"}/>, document.getElementById('root'));