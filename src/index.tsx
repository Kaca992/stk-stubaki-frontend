import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route} from 'react-router-dom';
import configureStore from './store';
import AppRoutes from './routes';

const store = configureStore();

ReactDOM.render(
  <AppRoutes />,
  document.getElementById('root'),
);
