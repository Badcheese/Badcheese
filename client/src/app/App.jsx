import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing.jsx';
import Board from './Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    // This line is important!
  }
  render() {
    return (
      <div>
        <Board />
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App cool={'really boring text'}/>, document.getElementById('root'));
