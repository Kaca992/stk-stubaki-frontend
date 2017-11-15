import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Router, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
// import { configureStore } from './store';
import App from './App';

// const store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
