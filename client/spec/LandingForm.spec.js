import React from 'react';
// shallow is important it makes sure your test only tests intended component and not it's children
import { mount, shallow, render } from 'enzyme';
import {expect} from 'chai';
import LandingForm from '../src/app/LandingForm';

describe('<LandingForm />', function () {
  it('renders a <FormGroup /> component', () => {
    const wrapper = shallow(<LandingForm />);
    expect(wrapper.find('FormGroup')).to.have.length(1);
  });
  it('should render one FormControl instance', function () {
    const wrapper = shallow(<LandingForm />);
    expect(wrapper.find('FormControl')).to.have.length(1);
  });
  it('should have drawmie-input class', function () {
    const wrapper = shallow(<LandingForm />);
    expect(wrapper.find('FormControl').hasClass('drawmie-input')).to.equal(true);
  });
});