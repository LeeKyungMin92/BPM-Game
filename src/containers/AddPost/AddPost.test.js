import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import AddPost from './AddPost';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/post';

const stubInitialState = {
  test: [
    {id: 1, title: 'NOTICE_TEST_TITLE_1'},
    {id: 2, title: 'NOTICE_TEST_TITLE_2'},
    {id: 3, title: 'NOTICE_TEST_TITLE_3'},
  ],
  selectedPost: null,
}

const mockStore = getMockStore(stubInitialState);

describe('<AddPost />', () => {
  let addPost;

  beforeEach(() => {
    addPost = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact render={() => <AddPost boardType="Test" />} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
  })

  it('should render AddPost', () => {
    const component = mount(addPost);
    const wrapper = component.find('.AddPost');
    expect(wrapper.length).toBe(1);
  });

  it(`should call 'postPost'`, () => {
    window.alert = jest.fn();
    const spyPostPost = jest.spyOn(actionCreators, 'postPost')
    .mockImplementation(pt => { return dispatch => {}; });
    const component = mount(addPost)
    const wrapper = component.find('button');
    wrapper.simulate('click');
    expect(spyPostPost).toHaveBeenCalledTimes(1);
  });

  it(`should set state properly on title input`, () => {
    const title = 'TEST_TITLE';
    const component = mount(addPost);
    const wrapper = component.find('input');
    wrapper.simulate('change', { target: {value: title } });
    const addPostInstance = component.find(AddPost.WrappedComponent).instance();
    expect(addPostInstance.state.title).toEqual(title);
    expect(addPostInstance.state.content).toEqual('');
  });

  it(`should set state properly on content input`, () => {
    const content = 'TEST_CONTENT';
    const component = mount(addPost);
    const wrapper = component.find('textarea');
    wrapper.simulate('change', { target: {value: content } });
    const addPostInstance = component.find(AddPost.WrappedComponent).instance();
    expect(addPostInstance.state.title).toEqual('');
    expect(addPostInstance.state.content).toEqual(content);
  })
});