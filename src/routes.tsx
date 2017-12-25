import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';

import { PATHS } from './constants/route.config';
// pages

const Home = () => {
  return(
    <div>
      Home
    </div>
  );
};

export default class AppRoutes extends React.Component<{}, {}> {
    render() {
      return (
        <Switch>
          <Route exact path={PATHS.home} component={Home}/>
       </Switch>
      );
    }
}
