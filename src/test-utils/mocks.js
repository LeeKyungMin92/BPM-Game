import { createStore, combineReducers, applyMiddleware, compose } from 'redux';                                    
import { connectRouter } from 'connected-react-router';
import { history, middlewares } from '../store/store';

const getMockPostReducer = jest.fn(
  initialState => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

export const getMockStore = (initialState) => {
  const mockPostReducer = getMockPostReducer(initialState);
  const rootReducer = combineReducers({
    pt: mockPostReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
}