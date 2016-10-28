import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

const Form = React.createClass({
  getInitialState() {
    return {
      value: ''
    };
  },

  getValidationState() {
    const length = this.state.value.length;
    if (length < 5 && length !== 0) {
      return 'success';
    } else if (length > 4) {
      return 'warning';
    }
  },

  handleChange(e) {
    this.setState({ value: e.target.value });
  },

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          {/* <ControlLabel>Some Text can go here</ControlLabel> */}
          <FormControl
            type="text"
            value={this.state.value}
            className="drawmie-input"
            placeholder="Enter ID"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
});

export default Form;
