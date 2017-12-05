import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, IndexRoute, IndexRedirect, hashHistory, Redirect } from 'react-router-dom';

import { Layout } from './pages/Layout';

// pages
import {App} from './containers/competitionSelector';

export const paths = {
    root: '/',
    test: 'Test',
};

// default layout creator

function DefaultLayout({content, ...rest}) {
    return (
      <Route {...rest} render={matchProps => (<Layout content={content} />)} />
    );
}

export default class AppRoutes extends React.Component<{}, {}> {
    render() {
      return (
       <Router>
          <div>
            <DefaultLayout exact path="/" content={<App />} />
          </div>
       </Router>
      );
    }
  }