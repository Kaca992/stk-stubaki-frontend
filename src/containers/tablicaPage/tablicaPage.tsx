import * as React from 'react';
import { connect } from 'react-redux';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import { IStore } from '../../store';

import './tablicaPage.scss';
import Grid from '../../components/grid/grid';
import { IHeaderProps } from '../../components/grid/grid.props';
import {tableData} from '../../mock/mockTable';

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

    _createHeaders(): IHeaderProps[] {
        return [
            {
                id: 'position',
                value: ' ',
            },

            {
                id: 'name',
                value: ' ',
            },

            {
                id: 'gamesPlayed',
                value: 'OS'
            },

            {
                id: 'won',
                value: 'P'
            },

            {
                id: 'lost',
                value: 'I'
            },

            {
                id: 'draw',
                value: 'N'
            },

            {
                id: 'matches',
                value: 'M'
            },

            {
                id: 'points',
                value: 'B'
            }
        ];
    }

    render() {
        return (
            <div>
                <Grid
                    headers={this._createHeaders()}
                    rows={tableData}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TablicaPage);
