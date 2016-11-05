import React from 'react';
import ReactDOM from 'react-dom';
// this is how you import react-bootstrap components
import { Grid, Row, Col, Clearfix, Button, Panel, Tooltip, ButtonToolbar, OverlayTrigger } from 'react-bootstrap';
import Form from './LandingForm.jsx';

// vanilla ajax request to setup the board with the server
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

  // Bootstrap Grid Component
  const gridInstance = (
  <Grid>
    <Row className="show-grid">
      <Col xs={6} md={4}></Col>
      <Col xs={6} md={4} className='mid-grid'>
      <div className='drawmie-title'>
        <center>
          <h1 className="headers">Drawmie</h1>
          <ButtonToolbar>
          <OverlayTrigger placement="bottom" overlay={ tooltip }>
            <Button className="drawmie-button" bsStyle="primary" bsSize="large" onClick={ newBoard }>New Drawmie</Button>
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

};

module.exports = Landing;
