import { push } from 'connected-react-router';
import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getPosts_ = (boardType, posts) => {
  return { type: actionTypes.GET_ALL,boardType: boardType, posts: posts };
};

export const getPosts = (boardType) => {
  return dispatch => {
    return axios.get('/api/' + boardType + '/')
      .then(res => dispatch(getPosts_(boardType, res.data)));
  };
};

export const postPost_ = (boardType, pt) => {
  return {
    type: actionTypes.ADD_POST,
    boardType: boardType,
    id: pt.id,
    title: pt.title,
    content: pt.content
  };
};

export const postPost = (boardType, pt) => {
  return (dispatch) => {
    return axios.post('/api/' + boardType + '/', pt)
      .then(res => dispatch(postPost_(boardType, res.data)))
      .then(() => dispatch(push('/' + boardType)));
  };
};

export const deletePost_ = (boardType, id) => {
  return {
    type: actionTypes.DELETE_POST,
    boardType: boardType,
    targetId: id
  };
};

export const deletePost = (boardType, id) => {
  return (dispatch) => {
    return axios.delete('/api/' + boardType + '/' + id)
      .then(res => {
        dispatch(deletePost_(boardType, id));
      });
  };
};

export const getPost_ = (post) => {
  return {
    type: actionTypes.GET_POST,
    target: post
  };
};

export const getPost = (boardType, id) => {
  return (dispatch) => {
    return axios.get('/api/' + boardType + '/' + id)
      .then(res => {
        dispatch(getPost_(res.data));
      });
  };
};