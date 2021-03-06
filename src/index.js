import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './assets/font/iconfont.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app';

import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
