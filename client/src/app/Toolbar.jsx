import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';


var ToolBar = ({ draw }) => (
  <div>
    <div>
      <ButtonGroup vertical>
        <Button className="tools" bsSize="large" onClick={() => draw.toggleIsSelecting()}>Selector</Button>
        <Button className="tools" bsSize="large" onClick={() => draw.changeShapeType(draw.ShapeTypes.rect)}>Rect</Button>
        <Button className="tools" bsSize="large" onClick={() => draw.changeShapeType(draw.ShapeTypes.line)}>Line</Button>
        <Button className="tools" bsSize="large" onClick={() => draw.changeShapeType(draw.ShapeTypes.circle)}>Circle</Button>
        <Button className="tools" bsSize="large" onClick={() => draw.changeShapeType(draw.ShapeTypes.path)}>Path</Button>
      </ButtonGroup>
    </div>
    <div>
      <ButtonGroup vertical>
        <Button className="tools" bsSize="large">Black</Button>
        <Button className="tools" bsSize="large">Red</Button>
        <Button className="tools" bsSize="large">Yellow</Button>
        <Button className="tools" bsSize="large">Green</Button>
        <Button className="tools" bsSize="large">Purple</Button>
      </ButtonGroup>
    </div>
  </div>



// <div className="container">
//   <ul className="toolList" id="tools">
//     <li className="tools" onClick={() => draw.toggleStrokeFill()}>Toggle: Stroke or Fill</li>
//     <li className="tools" onClick={() => draw.changeColor(draw.Colors.black)}>Black</li>
//     <li className="tools" onClick={() => draw.changeColor(draw.Colors.red)}>Red</li>
//     <li className="tools" onClick={() => draw.changeColor(draw.Colors.yellow)}>Yellow</li>
//     <li className="tools" onClick={() => draw.changeColor(draw.Colors.green)}>Green</li>
//     <li className="tools" onClick={() => draw.changeColor(draw.Colors.purple)}>Purple</li>
//   </ul>
// </div>
);

export default ToolBar;
