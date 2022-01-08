import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import store from './store/index.js';


render(
  <Provider store={store}>
    <App dispatch={store.dispatch}/>
  </Provider>,
  document.getElementById('root')
)