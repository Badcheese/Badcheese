import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';


var ToolBar = ({ draw }) => (
  <div>
    <div>
      <ButtonGroup vertical>
        <Button className="tools" bsSize="large"
                onClick={() => draw.toggleIsSelecting()}>Selector</Button>
        <Button className="tools" bsSize="large"
                onClick={() => draw.changeShapeType(draw.ShapeTypes.rect)}>Rect</Button>
        <Button className="tools" bsSize="large"
                onClick={() => draw.changeShapeType(draw.ShapeTypes.line)}>Line</Button>
        <Button className="tools" bsSize="large"
                onClick={() => draw.changeShapeType(draw.ShapeTypes.circle)}>Circle</Button>
        <Button className="tools" bsSize="large"
                onClick={() => draw.changeShapeType(draw.ShapeTypes.path)}>Path</Button>
      </ButtonGroup>
    </div>
    <div>
      <ButtonGroup vertical>
        <Button className="tools" bsSize="large"
                onClick={() => draw.toggleStrokeFill('stroke')}>Stroke</Button>
        <Button className="tools" bsSize="large"
                onClick={() => draw.toggleStrokeFill('fill')}>Fill</Button>
        <Button className="tools" bsSize="large"
                onClick={() => draw.changeColor(draw.Colors.black)}>Black</Button>
        <Button className="tools" bsSize="large"
                onClick={() => draw.changeColor(draw.Colors.red)}>Red</Button>
        <Button className="tools" bsSize="large"
                onClick={() => draw.changeColor(draw.Colors.yellow)}>Yellow</Button>
        <Button className="tools" bsSize="large"
                onClick={() => draw.changeColor(draw.Colors.green)}>Green</Button>
        <Button className="tools" bsSize="large"
                onClick={() => draw.changeColor(draw.Colors.purple)}>Purple</Button>
      </ButtonGroup>
    </div>
  </div>
);

export default ToolBar;
