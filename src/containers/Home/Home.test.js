import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home'

describe('<Home />', () => {
  it('should render title without errors', () => {
    const component = shallow(<Home title={'TEST_TITLE'} />);
    const wrapper = component.find('.title');
    expect(wrapper.text()).toEqual('TEST_TITLE');
  });
});