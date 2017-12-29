import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import AppRoutes from '../../routes';
import Header from '../header/header';

import { HEADER_LINK, NAVBAR_LINKS } from '../../constants/route.config';

import './app.scss';

export default class App extends React.Component<any, any> {
  render(): JSX.Element {
    return (
        <div className="app-container">
            <Header links={NAVBAR_LINKS} headerLink={HEADER_LINK} className='desktop-navigation' />
            <Header links={NAVBAR_LINKS} headerLink={HEADER_LINK} isMobile className='mobile-navigation' />
            <div className="app-content">
                <AppRoutes />
            </div>
        </div>
    );
  }
}
