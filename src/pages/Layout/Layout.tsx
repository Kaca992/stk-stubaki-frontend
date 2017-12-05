import * as React from 'react';

export class Layout extends React.Component<any, any> {
  render() {
    return (
      <div className="app-container">
        <header className="app-header" />
        <div className="app-content">
          OVO je iz layouta:
          {this.props.content}
        </div>
      </div>
    );
  }
}