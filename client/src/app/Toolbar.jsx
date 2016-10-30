import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';


var ToolBar = ({ draw }) => (
  <ButtonGroup vertical>
    <Button className="tools" bsSize="large" onClick={() => draw.toggleIsSelecting()}>Selector</Button>
    <Button className="tools" bsSize="large" onClick={() => draw.changeShapeType(draw.ShapeTypes.rect)}>Rect</Button>
    <Button className="tools" bsSize="large" onClick={() => draw.changeShapeType(draw.ShapeTypes.line)}>Line</Button>
    <Button className="tools" bsSize="large" onClick={() => draw.changeShapeType(draw.ShapeTypes.circle)}>Circle</Button>
    <Button className="tools" bsSize="large" onClick={() => draw.changeShapeType(draw.ShapeTypes.path)}>Path</Button>
  </ButtonGroup>
);

export default ToolBar;
