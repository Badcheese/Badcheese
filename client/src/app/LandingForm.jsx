import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class Form extends React.Component {
  constructor(props) {
    super(props);
    // This line is important!
    this.state = {
      value: ''
    }
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length < 5 && length !== 0) {
      return 'success';
    } else if (length > 4) {
      return 'warning';
    }
  }

  handleChange(e) {
    this.setState({ value: e.target.value }, ()=> window.location.hash = this.state.value);
  }

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <FormControl
            type="text"
            value={this.state.value}
            className="drawmie-input"
            placeholder="Enter ID"
            onChange={this.handleChange.bind(this)}
          />
          <FormControl.Feedback /> 
        </FormGroup>
      </form>
    );
  }
}

export default Form;
