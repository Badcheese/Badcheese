import React from 'react';

// <a onClick={function() { this.state.draw.changeShapeType(this.state.draw.ShapeTypes.rect); }.bind(this)} href='#'>Rect</a>

var ToolBar = ({ draw }) => (
  <nav className="toolbar">
    <div className="container">
      <ul className="toolList" id="tools">
        <li className="tools" onClick={() => draw.toggleIsSelecting()}>Selector</li>
        <li className="tools" onClick={() => draw.changeShapeType(draw.ShapeTypes.rect)}>Rect</li>
        <li className="tools" onClick={() => draw.changeShapeType(draw.ShapeTypes.line)}>Line</li>
        <li className="tools" onClick={() => draw.changeShapeType(draw.ShapeTypes.circle)}>Circle</li>
        <li className="tools" onClick={() => draw.changeShapeType(draw.ShapeTypes.path)}>Path</li>
      </ul>
    </div>
    <div className="container">
      <ul className="toolList" id="tools">
        <li className="tools" onClick={() => draw.toggleStrokeFill()}>Toggle: Stroke or Fill</li>
        <li className="tools" onClick={() => draw.changeColor(draw.Colors.black)}>Black</li>
        <li className="tools" onClick={() => draw.changeColor(draw.Colors.red)}>Red</li>
        <li className="tools" onClick={() => draw.changeColor(draw.Colors.yellow)}>Yellow</li>
        <li className="tools" onClick={() => draw.changeColor(draw.Colors.green)}>Green</li>
        <li className="tools" onClick={() => draw.changeColor(draw.Colors.purple)}>Purple</li>
      </ul>
    </div>
  </nav>
);

export default ToolBar;
