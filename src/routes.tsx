import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';

import { PATHS, SELECTOR_LINKS } from './constants/route.config';
// pages

import SeasonSelector from './containers/seasonSelector/seasonSelector';
import SeasonPage from './containers/seasonPage/seasonPage';

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
          <Route path={PATHS.seasonSelector} component={() => <SeasonSelector urlLink={SELECTOR_LINKS.seasonPage} />}/>
          <Route path={PATHS.seasonPage} component={({match}) => <SeasonPage seasonId={match.params.id} />}/>
       </Switch>
      );
    }
}
