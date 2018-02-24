import * as React from 'react';
import { connect } from 'react-redux';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import { IStore } from '../../store';

import './seasonPage.scss';
import {tableData} from '../../mock/mockTable';
import CustomTable, {IHeaderProps} from '../../components/customTable/customTable';
import { headers } from './seasonPage.utils';
import { Header, Divider, Loader } from 'semantic-ui-react';
import { ISeasonInfo } from '../../common/dataStructures';
import { getSeasonDisplayName } from '../../utils/displayFormaters';

export interface ISeasonOwnProps {
    seasonId: any;
}

export interface ISeasonPageProps extends ISeasonOwnProps {
    seasonInfo: ISeasonInfo;

    isLoadingSeasons: boolean;
}

export interface ISeasonPageState {

}

function mapStateToProps(state: IStore, ownProps: ISeasonOwnProps): Partial<ISeasonPageProps> {
    return {
        ...ownProps,
        seasonInfo: state.season.byId[ownProps.seasonId],
        isLoadingSeasons: state.season.UI.isLoading
    };
}

function mapDispatchToProps(dispatch: any): Partial<ISeasonPageProps> {
    return {

    };
}

class SeasonPage extends React.Component<ISeasonPageProps, ISeasonPageState> {
    constructor(props: ISeasonPageProps) {
        super(props);

    }

    render() {
        const {
            seasonId,
            seasonInfo,
            isLoadingSeasons
        } = this.props;

        if (!seasonInfo || isLoadingSeasons) {
            return <Loader active inline='centered' size='large' > Učitavanje... </Loader>;
        }

        return (
            <div>
                <Header as='h2' textAlign='center'>{`${getSeasonDisplayName(seasonInfo.type)}, Sezona ${seasonInfo.godina}.`}</Header>

                <CustomTable
                    headers={headers}
                    data={tableData}
                    rowKey='teamId'
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonPage);
