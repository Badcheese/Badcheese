import React from 'react';
import ReactDOM from 'react-dom';
import {Grid, Row, Col, Clearfix, Button, Panel, Tooltip, ButtonToolbar, OverlayTrigger} from 'react-bootstrap';
import Form from './LandingForm.jsx';

const Landing = (props) => {
  const origin = window.location.origin;
  const App = props.App;
  const newBoard = () => {
    console.log('button clicked');
    const requestBoard = new XMLHttpRequest();
    requestBoard.addEventListener('load', (response) => {
      const newBoardId = response.target.response;
      window.location.hash = newBoardId;
      ReactDOM.render(<App />, document.getElementById('root'));
    });
    requestBoard.open('GET', origin + '/board');
    requestBoard.send();
  };

  const tooltip = (
  <Tooltip id="tooltip"><strong>Start a new Drawmie!</strong></Tooltip>
);

  const gridInstance = (
  <Grid>
    <Row className="show-grid">
      <Col xs={6} md={4}></Col>
      <Col xs={6} md={4}>
      <div className='drawmie-title'>
        <center>
          <h1 className="headers">Drawmie</h1>
          <ButtonToolbar>
          <OverlayTrigger placement="bottom" overlay={tooltip}>
            <Button className="drawmie-button" bsStyle="primary" bsSize="large" onClick={newBoard}>New Drawmie</Button>
          </OverlayTrigger>
          </ButtonToolbar>
        </center>

        <Panel className="drawmie-join" header='Join A Drawmie'>
          <Form />
        </Panel>
        </div>
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
