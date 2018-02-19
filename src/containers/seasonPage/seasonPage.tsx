import * as React from 'react';
import { connect } from 'react-redux';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import { IStore } from '../../store';

import './seasonPage.scss';
import {tableData} from '../../mock/mockTable';
import CustomTable, {IHeaderProps} from '../../components/customTable/customTable';
import { headers } from './seasonPage.utils';

export interface ISeasonOwnProps {
    seasonId: any;
}

export interface ISeasonPageProps extends ISeasonOwnProps {

}

export interface ISeasonPageState {

}

function mapStateToProps(state: IStore, ownProps: ISeasonOwnProps): Partial<ISeasonPageProps> {
    return {
        ...ownProps
    };
}

function mapDispatchToProps(dispatch: any): Partial<ISeasonPageProps> {
    return {

    };
}

class TablicaPage extends React.Component<ISeasonPageProps, ISeasonPageState> {
    constructor(props: ISeasonPageProps) {
        super(props);

    }

    render() {
        return (
            <div>
                <CustomTable
                    headers={headers}
                    data={tableData}
                    rowKey='teamId'
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TablicaPage);
