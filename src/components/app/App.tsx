import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppRoutes from '../../routes';
import Header from '../header/header';

import { HEADER_LINK, NAVBAR_LINKS } from '../../constants/route.config';

export default class App extends React.Component<any, any> {
  render(): JSX.Element {
    return (
        <div className="app-container">
            <Header links={NAVBAR_LINKS} headerLink={HEADER_LINK} />
            <div className="app-content">
                <AppRoutes />
            </div>
        </div>
    );
  }
}
