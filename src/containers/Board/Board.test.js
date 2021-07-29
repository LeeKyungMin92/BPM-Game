import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import Board from './Board';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/post';

jest.mock('../../components/Post/Post', () => {
  return jest.fn(props => {
    return (
      <div className="spyPost">
        <div className="title" onClick={props.clickDetail}>
          {props.title}
        </div>
        <button className="deleteButton" onClick={props.clickDelete} />
      </div>
    );
  });
});

const stubInitialState = {
  test: [
    {id: 1, title: 'NOTICE_TEST_TITLE_1'},
    {id: 2, title: 'NOTICE_TEST_TITLE_2'},
    {id: 3, title: 'NOTICE_TEST_TITLE_3'},
  ],
  selectedPost: null,
}

const mockStore = getMockStore(stubInitialState);

describe('<Board />', () => {
  let board, spyGetPosts;

  beforeEach(() => {
    board = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact render={() => <Board boardType="Test" />} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetPosts = jest.spyOn(actionCreators, 'getPosts')
    .mockImplementation(boardType => { return dispatch => {}; });
  })

  it('should render Posts', () => {
    const component = mount(board);
    const wrapper = component.find('.spyPost');
    expect(wrapper.length).toBe(3);
    expect(wrapper.at(0).text()).toBe('NOTICE_TEST_TITLE_1');
    expect(wrapper.at(1).text()).toBe('NOTICE_TEST_TITLE_2');
    expect(wrapper.at(2).text()).toBe('NOTICE_TEST_TITLE_3');
    expect(spyGetPosts).toBeCalledTimes(1);
  });

  it(`should call 'clickPostHandler'`, () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
    .mockImplementation(path => {});
    const component = mount(board);
    const wrapper = component.find('.spyPost .title').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/test/1')
  });

  it(`should call 'clickDelete'`, () => {
    const spyDeletePost = jest.spyOn(actionCreators, 'deletePost')
    .mockImplementation(id => {return dispatch => {}; });
    const component = mount(board);
    const connectedRouter = component.find(ConnectedRouter);
    const wrapper = component.find('.spyPost .deleteButton').at(0);
    wrapper.simulate('click');
    expect(spyDeletePost).toHaveBeenCalledTimes(1);
  });
})