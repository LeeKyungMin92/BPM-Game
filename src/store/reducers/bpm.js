import * as actionTypes from '../actions/actionTypes';

const initialState = {
  bpm: null,
  accuracy: null,
  index: null,
  ranking: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BPM: 
      return {...state, bpm: action.bpm};

    case actionTypes.SET_ACC:
      return {
        ...state, 
        accuracy: action.accuracy, 
        index: action.index, 
        ranking: action.ranking, 
      };
    case actionTypes.RESET_ACC_AND_BPM:
      return {
        ...state, 
        bpm: null,
        accuracy: null,
        index: null,
        ranking: null
      }

    default:
      break;
  }
  return state;
};
export default reducer;