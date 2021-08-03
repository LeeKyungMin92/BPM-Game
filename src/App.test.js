import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import App from './App';
import { getMockStore } from './test-utils/mocks';
import { history } from './store/store';
import * as actionCreators from './store/actions/post';

const mockStore = getMockStore({ test: [], selectedPost: null });

jest.mock('./containers/Board/Board', () => {
  return jest.fn(props => {
    return (
      <div className="spyBoard">
        {props.title}
      </div>
    );
  });
});

jest.mock('./containers/AddPost/AddPost', () => {
  return jest.fn(props => {
    return (
      <div className="spyAddPost">
        {props.title}
      </div>
    );
  });
});

describe('App', () => {
  let app;
  let boards = ['free', 'notice'];

  beforeEach(() => {
    app = (
      <Provider store={mockStore}>
        <App history={history}/>
      </Provider>
    )
  });

  it('should render', () => {
    const component = mount(app);
    expect(component.find(".App").length).toBe(1);
  });

  it('should be redirected to Boards', () => {
    boards.forEach(boardName => {
      history.push('/' + boardName);
      const component = mount(app);
      expect(component.find('.spyBoard').length).toBe(1);
    });
  });

  it('should be redirected to AddPosts', () => {
    boards.forEach(boardName => {
      history.push('/' + boardName + '/add');
      const component = mount(app);
      expect(component.find('.spyAddPost').length).toBe(1);
    });
  });

  it('should be redirected to NotFound', () => {
    history.push('/aaa');
    const component = mount(app);
    expect(component.find('h1').text()).toBe('Not Found');
  });
});