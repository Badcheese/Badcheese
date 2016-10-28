import React from 'react';

const newBoard = () => {
  console.log('button clicked');
  const requestBoard = new XMLHttpRequest();
  requestBoard.addEventListener('load', (data) => {
    console.log(data);
  });
  requestBoard.open('GET', 'http://localhost:3000/board');
  requestBoard.send();
};

const Landing = () => {
  return (
    <center>
      <h1>Drawmie Landing Page</h1>
      <button onClick={newBoard}>New Drawmie</button>
    </center>
  );
};

module.exports = Landing;
