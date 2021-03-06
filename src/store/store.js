import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';                                           
import { connectRouter, routerMiddleware } from 'connected-react-router';       
import { createBrowserHistory } from 'history';                                 

import postReducer from './reducers/post';
import accReducer from './reducers/acc';    
import bpmReducer from './reducers/bpm';                                      

export const history = createBrowserHistory();                                  
const rootReducer = combineReducers({                                           
  pt: postReducer,
  ac: accReducer,
  bpm: bpmReducer,
  router: connectRouter(history),                                               
});
export const middlewares = [thunk, routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

export default store;
