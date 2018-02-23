import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store';

import Main from './containers/main/main';
const styles = require('./style/index.scss');

const store = configureStore();

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <Main />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
