import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import Routes from './routes';
import reducers from './reducers';
import Promise from 'promise-polyfill'; 

// poor ie...
if (!window.Promise) {
  window.Promise = Promise;
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    {Routes}
  </Provider>
  , document.querySelector('.container'));
