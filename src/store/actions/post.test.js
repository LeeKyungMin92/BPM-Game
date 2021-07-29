import axios from 'axios';
import * as actionCreators from './post'
import store from '../store';

describe('ActionCreators', () => {
  let real_axios_get;
  let boards = ['free', 'notice'];

  beforeEach(() => {
    real_axios_get = axios.get;
  });

  afterEach(() => {
    jest.clearAllMocks();
    axios.get = real_axios_get;
  })

  it(`'getPosts' should fetch posts correctly`, (done) => {
    const stubPostList = [{
      id: 0,
      title: 'title 1',
      content: 'content 1',
    }];

    axios.get = jest.fn(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubPostList
        };
        resolve(result);
      })
    });

    let count = 0;
    boards.forEach(boardName => {
      count += 1;

      store.dispatch(actionCreators.getPosts(boardName))
      .then(() => {
        const newState = store.getState();
        expect(newState.pt[boardName]).toBe(stubPostList);
        expect(axios.get).toHaveBeenCalledTimes(count);
        done();
      });
    });
  });

  it(`'postPost' should post post correctly`, (done) => {
    const stubPost = {
      id: 1,
      title: 'title 2',
      content: 'content 2',
    };

    axios.post = jest.fn(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubPost
        };
        resolve(result);
      })
    });

    let count = 0;
    boards.forEach(boardName => {
      count += 1;

      store.dispatch(actionCreators.postPost(boardName, stubPost))
      .then(() => {
        const newState = store.getState();
        expect(newState.pt[boardName][stubPost.id]).toEqual(stubPost);
        expect(axios.post).toHaveBeenCalledTimes(count);
        done();
      });
    });
  });

  it(`'getPost' should fetch post correctly`, (done) => {
    const stubId = 1;

    axios.get = jest.fn(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubId
        };
        resolve(result);
      })
    });

    let count = 0;
    boards.forEach(boardName => {
      count += 1;

      store.dispatch(actionCreators.getPost(boardName, stubId))
      .then(() => {
        const newState = store.getState();
        expect(newState.pt.selectedPost).toEqual(stubId);
        expect(axios.get).toHaveBeenCalledTimes(count);
        done();
      });
    });
  });

  it(`'deletePost' should delete post correctly`, (done) => {
    const stubId = 0;
    const stubPostList = [{
      id: 1,
      title: 'title 2',
      content: 'content 2',
    }];

    axios.delete = jest.fn(url => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: null
        };
        resolve(result);
      })
    });

    let count = 0;
    boards.forEach(boardName => {
      count += 1;

      store.dispatch(actionCreators.deletePost(boardName, stubId))
      .then(() => {
        const newState = store.getState();
        expect(newState.pt[boardName]).toEqual(stubPostList);
        expect(axios.delete).toHaveBeenCalledTimes(count);
        done();
      });
    });
  });
});