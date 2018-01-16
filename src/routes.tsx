import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';

import { PATHS } from './constants/route.config';
// pages

// testing
import SeasonSelector from './containers/seasonSelector/seasonSelector';

const Home = () => {
  return(
    <div>
      Home
    </div>
  );
};

const Home2 = () => {
  return(
    <SeasonSelector/>
  );
};

export default class AppRoutes extends React.Component<{}, {}> {
    render() {
      return (
        <Switch>
          <Route exact path={PATHS.home} component={Home}/>
          <Route path={PATHS.competition} component={Home2}/>
       </Switch>
      );
    }
}
