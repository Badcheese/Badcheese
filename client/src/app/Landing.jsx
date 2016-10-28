import React from 'react';
import ReactDOM from 'react-dom';


const Landing = (props) => {
  const App = props.App;
  const newBoard = () => {
    console.log('button clicked');
    const requestBoard = new XMLHttpRequest();
    requestBoard.addEventListener('load', (response) => {
      const newBoardId = response.target.response;
      window.location.hash = newBoardId;
      ReactDOM.render(<App />, document.getElementById('root'));
    });
    requestBoard.open('GET', 'http://localhost:3000/board');
    requestBoard.send();
  };
  return (
    <center>
      <h1>Drawmie Landing Page</h1>
      <button onClick={newBoard}>New Drawmie</button>
    </center>
  );
};

module.exports = Landing;
