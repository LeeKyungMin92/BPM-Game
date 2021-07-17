import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import './index.css';
import App from './App';
import postReducer from './store/reducers/post';
import reportWebVitals from './reportWebVitals';

const rootReducer = combineReducers({
  pt: postReducer,
});

const store = createStore(rootReducer);

// Error Reporter for Middleware
const logger = store => next => action => {
  try {
    return next(action);
  } catch(err) {
    console.error('Catched error', err, action);
    throw(err);
  } 
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
