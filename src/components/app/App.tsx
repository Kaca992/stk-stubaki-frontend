import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppRoutes from '../../routes';

export default class App extends React.Component<any, any> {
  render() {
    return (
        <div className="app-container">
            <header className="app-header">
                HEADER
            </header>
            <div className="app-content">
                <AppRoutes />
            </div>
        </div>
    );
  }
}
