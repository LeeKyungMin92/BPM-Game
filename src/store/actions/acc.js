import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getAccs_ = (ranking) => {
  return { 
    type: actionTypes.GET_RANKING,
    ranking: ranking
  };
};

export const getAccs = (bpm) => {
  return dispatch => {
    return axios.get('/bpmapi/' + bpm + '/')
      .then(res => dispatch(getAccs_(res.data)));
  };
};

export const postAcc_ = (bpm, ac) => {
  return {
    type: actionTypes.ADD_RANKING,
    bpm: bpm,
    accuracy: ac.accuracy,
    index: ac.index
  };
};

export const postAcc = (bpm, ac) => {
  return (dispatch) => {
    return axios.post('/bpmapi/' + bpm + '/', ac)
      .then(res => dispatch(postAcc_(bpm, res.data)))
  };
};