import * as actionTypes from '../actions/actionTypes';

const initialState = {
  notice: [],
  free: [],
  selectedPost: null,
};

const reducer = (state = initialState, action) => {
  let ret;
  switch (action.type) {
    case actionTypes.ADD_POST: 
      const newPost = {
        id: action.id,
        title: action.title,
        content: action.content,
      };
      ret = {...state};
      ret[action.boardType] = ret[action.boardType].concat(newPost);
      return ret;
    
    case actionTypes.DELETE_POST: 
      const deletedPost = state[action.boardType].filter((post) => post.id !== action.targetId);
      ret = {...state};
      ret[action.boardType] = deletedPost;
      return ret;

    case actionTypes.GET_POST: 
      return { ...state, selectedPost: action.target };

    case actionTypes.GET_ALL:
      ret = {...state};
      ret[action.boardType] = action.posts;
      return ret;

    default:
      break;
  }
  return state;
};
export default reducer;
