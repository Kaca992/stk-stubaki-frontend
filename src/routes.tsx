import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';

import { PATHS, SELECTOR_LINKS } from './constants/route.config';
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

const Home2 = ({match}) => {
  return(
    <div>
      {match.params.id}
    </div>
  );
};

export default class AppRoutes extends React.Component<{}, {}> {
    render() {
      return (
        <Switch>
          <Route exact path={PATHS.home} component={Home}/>
          <Route path={PATHS.competitionSelector} component={() => <SeasonSelector urlLink={SELECTOR_LINKS.competitionPage} />}/>
          <Route path={PATHS.competitionPage} component={Home2}/>
       </Switch>
      );
    }
}
