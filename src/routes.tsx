import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';

// pages
import {App} from './containers/competitionSelector';

export const paths = {
    root: '/',
    competition: '/competition',
};

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
          <Route exact path='/' component={Home}/>
          <Route path='/competition' component={App}/>
       </Switch>
      );
    }
}
