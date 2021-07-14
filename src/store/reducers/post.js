import * as actionTypes from '../actions/actionTypes';

const initialState = {
  noticePosts: [
    { id: 1, title: 'Welcome!', content: 'Welcome to my page' },
    { id: 2, title: 'Rules', content: 'Swing your body round and round.' },
    { id: 3, title: 'Today\'s dinner', content: 'Today\'s dinner is chicken.' },
  ],
  nextNotice: 4,
  freePosts: [
    { id: 1, title: '( ՞⌓°⎞', content: 'a?' },
    { id: 2, title: 'INN', content: 'INN' },
    { id: 3, title: 'I want to travel overseas', content: 'But I can\'t.' },
  ],
  nextFree: 4,
  selectedPost: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_POST_NOTICE: 
      const newNotice = {
        id: state.nextNotice,
        title: action.title,
        content: action.content,
      };
      state.nextNotice += 1;
      return { ...state, noticePosts: state.noticePosts.concat(newNotice) };
    
    case actionTypes.ADD_POST_FREE: 
      const newFree = {
        id: state.nextFree,
        title: action.title,
        content: action.content,
      };
      state.nextFree += 1;
      return { ...state, freePosts: state.freePosts.concat(newFree) };
    
    case actionTypes.DELETE_POST_NOTICE: 
      const deletedNotice = state.noticePosts.filter((post) => post.id !== action.targetID);
      return { ...state, noticePosts: deletedNotice };

    case actionTypes.DELETE_POST_FREE: 
      const deletedFree = state.freePosts.filter((post) => post.id !== action.targetID);
      return { ...state, freePosts: deletedFree };

    case actionTypes.GET_POST_NOTICE: 
      const targetNotice = { ...state.noticePosts.find((post) => post.id == action.targetID) };
      return { ...state, selectedPost: targetNotice };

    case actionTypes.GET_POST_FREE: 
      const targetFree = { ...state.freePosts.find((post) => post.id == action.targetID) };
      return { ...state, selectedPost: targetFree };

    default:
      break;
  }
  return state;
};
export default reducer;
