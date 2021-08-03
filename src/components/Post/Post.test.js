import React from 'react';
import { shallow } from 'enzyme';
import Post from './Post'

describe('<Post />', () => {
  it('should render title without errors', () => {
    const component = shallow(<Post title={'TEST_TITLE'} />);
    const wrapper = component.find('.text');
    expect(wrapper.text()).toEqual('TEST_TITLE');
  });
});