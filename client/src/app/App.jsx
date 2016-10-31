import React from 'react';
import ReactDOM from 'react-dom';
import Landing from './Landing.jsx';
import Board from './Board.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // if no room/"hash" is chosen renders landing page otherwise renders board
    return (
      <div>
        {function() {
          if (window.location.hash === '') {
            return (<Landing App={App}/>);
          } else {
            return (<Board/>);
          }
        }()}
      </div>
    );
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
