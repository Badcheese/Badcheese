import React from 'react';
import { mount, shallow, render } from 'enzyme';
import {expect} from 'chai';
import Toolbar from '../src/app/Toolbar';

describe('<Toolbar />', function () {

  it('should have props for draw', function () {
    const wrapper = shallow(<Toolbar />);
    expect(wrapper.props().draw).to.be.defined;
  });
  it('renders three ButtonGroup components', () => {
    const wrapper = shallow(<Toolbar />);
    expect(wrapper.find('ButtonGroup')).to.have.length(3);
  });
  it('renders three ButtonGroup components', () => {
    const wrapper = shallow(<Toolbar />);
    expect(wrapper.find('Button')).to.have.length(15);
  });
});