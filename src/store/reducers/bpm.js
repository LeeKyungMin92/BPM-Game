import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ranking: [],
};

const reducer = (state = initialState, action) => {
  let ret;
  switch (action.type) {
    case actionTypes.ADD_RANKING: 
      const newAcc = action.accuracy
      ret = {...state};
      //ret[ranking] = ret[ranking].concat(newAcc);
      ret.ranking.splice(action.index, 0, newAcc);  // insert
      return ret;

    case actionTypes.GET_RANKING:
      ret = {...state, ranking: action.ranking};
      console.log(action.ranking.sort((a, b) => {
        if (a.accuracy > b.accuracy) { return 1; }
        if (a.accuracy < b.accuracy) { return -1; }
        return 0;
      }));
      return ret;

    default:
      break;
  }
  return state;
};
export default reducer;