import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const wellStyles = {maxWidth: 250, margin: '0 auto 10px'};


var ToolBar = ({ draw }) => (
  <div>
    <div className="well" style={wellStyles}>
    <center><h5>Fill Style</h5></center>
      <div>
        <ButtonGroup vertical>
          <Button className="tools" bsSize="large" block
            onClick={() => draw.toggleStrokeFill('stroke')}>Stroke</Button>
          <Button className="tools" bsSize="large" block
            onClick={() => draw.toggleStrokeFill('fill')}>Filled</Button>
        </ButtonGroup>
        <br />
        <center><h5>Shape</h5></center>
        <ButtonGroup vertical>
          <Button className="tools" bsSize="large"
            onClick={() => draw.toggleIsSelecting()}>Drag</Button>
          <Button className="tools" bsSize="large"
            onClick={() => draw.changeShapeType(draw.ShapeTypes.rect)}>Rect</Button>
          <Button className="tools" bsSize="large"
            onClick={() => draw.changeShapeType(draw.ShapeTypes.line)}>Line</Button>
          <Button className="tools" bsSize="large"
            onClick={() => draw.changeShapeType(draw.ShapeTypes.circle)}>Circle</Button>
          <Button className="tools" bsSize="large"
            onClick={() => draw.changeShapeType(draw.ShapeTypes.path)}>Draw</Button>
        </ButtonGroup>
        <br />
        <center><h5>Color</h5></center>
        <ButtonGroup vertical className='color-picker'>
          <Button className="tools button-black" bsSize="large"
            onClick={() => draw.changeColor(draw.Colors.black)}></Button>
          <Button className="tools button-white" bsSize="large"
            onClick={() => draw.changeColor(draw.Colors.white)}></Button>
          <Button className="tools" bsSize="large" bsStyle="danger"
            onClick={() => draw.changeColor(draw.Colors.red)}></Button>
          <Button className="tools button-yellow" bsSize="large"
            onClick={() => draw.changeColor(draw.Colors.yellow)}></Button>
          <Button className="tools button-alice" bsSize="large"
          onClick={() => draw.changeColor(draw.Colors.aliceblue)}></Button>
          <Button className="tools" bsSize="large" bsStyle="success"
            onClick={() => draw.changeColor(draw.Colors.green)}></Button>
          <Button className="tools button-purple" bsSize="large"
            onClick={() => draw.changeColor(draw.Colors.purple)}></Button>
          <Button className="tools button-blue" bsSize="large"
            onClick={() => draw.changeColor(draw.Colors.blue)}></Button>
        </ButtonGroup>
      </div>
    </div>
  </div>
);

export default ToolBar;
