import React from 'react';
// shallow is important it makes sure your test only tests intended component and not it's children
import { mount, shallow, render } from 'enzyme';
import {expect} from 'chai';
import App from '../src/app/App';

describe('<App />', function () {

  it('should be a total Baller!!!!', function () {
    const wrapper = shallow(<App />);
    expect(wrapper.props().baller).to.be.undefined;
  });
});