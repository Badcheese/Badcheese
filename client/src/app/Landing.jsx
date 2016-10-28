import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Clearfix, Button, Panel} from 'react-bootstrap';
import Form from './LandingForm.jsx';

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

  const gridInstance = (
  <Grid>
    <Row className="show-grid">
      <Col xs={6} md={4}></Col>
      <Col xs={6} md={4}>
        <center>
          <h1>Drawmie</h1>
          <Button className="drawmie-button" bsStyle="primary" bsSize="large" onClick={newBoard}>New Drawmie</Button>
        </center>
        <Panel className="drawmie-join" header='Join A Drawmie'>
          <Form />
        </Panel>
      </Col>
      <Col xs={6} md={4}></Col>
    </Row>
  </Grid>
);

  return gridInstance;


  // return (
  //   <center>
  //     <h1>Drawmie Landing Page</h1>
  //     <button onClick={newBoard}>New Drawmie</button>
  //   </center>
  // );
};

module.exports = Landing;
