import React from 'react';
import { mount, shallow, render } from 'enzyme';
import {expect} from 'chai';
import Nav from '../src/client/app/Nav';

describe('<App />', function () {
  it('renders one <Nav /> components', () => {
    const wrapper = shallow(<Nav />);
    expect(wrapper.find(Nav)).to.have.length(0);
  });

  it('should have an image to display', function () {
    const wrapper = shallow(<Nav />);
    expect(wrapper.find('img')).to.have.length(1);
  });

  it('should have props for email and src', function () {
    const wrapper = shallow(<Nav />);
    expect(wrapper.props().email).to.be.defined;
    expect(wrapper.props().src).to.be.defined;
  });
});