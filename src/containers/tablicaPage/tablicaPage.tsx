import * as React from 'react';
import { connect } from 'react-redux';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import { IStore } from '../../store';

import './tablicaPage.scss';

export interface ITablicaOwnProps {
    seasonId: any;
}

export interface ITablicaPageProps extends ITablicaOwnProps {

}

export interface ITablicaPageState {

}

function mapStateToProps(state: IStore, ownProps: ITablicaOwnProps): Partial<ITablicaPageProps> {
    return {
        ...ownProps
    };
}

function mapDispatchToProps(dispatch: any): Partial<ITablicaPageProps> {
    return {

    };
}

class TablicaPage extends React.Component<ITablicaPageProps, ITablicaPageState> {
    constructor(props: ITablicaPageProps) {
        super(props);

    }

    render() {
        return (
            <div>
                This is test season id: {this.props.seasonId}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TablicaPage);
