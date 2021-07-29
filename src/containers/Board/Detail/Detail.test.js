import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import Detail from './Detail';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/actions/post';

const stubInitialState = {
  test: [],
  selectedPost: {
    id: 0,
    title: 'SELECTED_POST_TEST_TITLE',
    content: 'SELECTED_POST_TEST_CONTENT'
  },
};

const mockStore = getMockStore(stubInitialState);

describe('<Detail />', () => {
  let detail, spyGetPost;
  beforeEach(() => {
    detail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={Detail} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetPost = jest.spyOn(actionCreators, 'getPost')
    .mockImplementation(id => { return dispatch => {}; });
  })

  it('should render Detail', () => {
    const component = mount(detail);
    const wrapper = component.find('.Detail');
    expect(wrapper.length).toBe(1);
  });

  it('should render SELECTED_POST', () => {
    const component = mount(detail);
    const wrapper = component.find('.right');
    expect(wrapper.at(0).text()).toBe('0');
    expect(wrapper.at(1).text()).toBe('SELECTED_POST_TEST_TITLE');
    expect(wrapper.at(2).text()).toBe('SELECTED_POST_TEST_CONTENT');
  });

  it('should not render SELECTED_POST', () => {
    const mockInitialStore = getMockStore({test: [], selectedPost: null});
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={Detail} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const wrapper = component.find('.NotFound');
    expect(wrapper.length).toBe(1);
  });
})