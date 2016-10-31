import React from 'react';
// shallow is important it makes sure your test only tests intended component and not it's children
import { mount, shallow, render } from 'enzyme';
import {expect} from 'chai';
import Board from '../src/app/Board';

describe('<Board />', function () {
  it('renders a <Toolbar /> component', () => {
    const wrapper = shallow(<Board />);
    expect(wrapper.find('ToolBar')).to.have.length(1);
  });

  it('should render one canvas instance', function () {
    const wrapper = shallow(<Board />);
    expect(wrapper.find('canvas')).to.have.length(1);
  });
});