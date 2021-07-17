import * as actionTypes from '../actions/actionTypes';

const initialState = {
  notice: {
    nextIdx: 4,
    posts: [
      { id: 1, title: 'Welcome!', content: 'Welcome to my page' },
      { id: 2, title: 'Rules', content: 'Swing your body round and round.' },
      { id: 3, title: 'Today\'s dinner', content: 'Today\'s dinner is chicken.' },
    ]
  },
  free: {
    nextIdx: 4,
    posts: [
      { id: 1, title: '( ՞⌓°⎞', content: 'a?' },
      { id: 2, title: 'INN', content: 'INN' },
      { id: 3, title: 'I want to travel overseas', content: 'But I can\'t.' },
    ]
  },
  selectedPost: null,
};

const reducer = (state = initialState, action) => {
  let ret;
  switch (action.type) {
    case actionTypes.ADD_POST: 
      const newPost = {
        id: state[action.boardType].nextIdx,
        title: action.title,
        content: action.content,
      };
      state[action.boardType].nextIdx += 1;
      ret = {...state};
      ret[action.boardType].posts = ret[action.boardType].posts.concat(newPost);
      return ret;
    
    case actionTypes.DELETE_POST: 
      const deletedPost = state[action.boardType].posts.filter((post) => post.id !== action.targetID);
      ret = {...state};
      ret[action.boardType].posts = deletedPost;
      return ret;

    case actionTypes.GET_POST: 
      const targetPost = { ...state[action.boardType].posts.find((post) => post.id === action.targetID) };
      return { ...state, selectedPost: targetPost };

    default:
      break;
  }
  return state;
};
export default reducer;
