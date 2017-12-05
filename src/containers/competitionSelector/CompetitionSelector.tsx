import * as React from 'react';
import { connect } from 'react-redux';

export interface IAppProps {
    test?: string;
}

export class App extends React.Component<IAppProps, any> {
  render() {
    return (
      <div>
        Test
      </div>
    );
  }
}
