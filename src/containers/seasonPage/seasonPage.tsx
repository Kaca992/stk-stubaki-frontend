import * as React from 'react';
import { connect } from 'react-redux';

import * as classNames from 'classnames';
import { autobind } from 'core-decorators';

import { IStore } from '../../store';

import './seasonPage.scss';
import { tableData } from '../../mock/mockTable';
import CustomTable, { IHeaderProps } from '../../components/customTable/customTable';
import { teamHeaders, playerHeaders } from './seasonPage.utils';
import { Header, Divider, Loader } from 'semantic-ui-react';
import { ISeasonInfo, ITableTeamInfo, ITablePlayerInfo } from '../../common/dataStructures';
import { getSeasonDisplayName } from '../../utils/displayFormaters';
import { CompetitionDuck } from '../../ducks';
import { withRouter } from 'react-router';
import CustomText from '../../components/customText/customText';
import { CustomTextTypeEnum } from '../../common/enums';

export interface ISeasonOwnProps {
    seasonId: any;
}

export interface ISeasonPageProps extends ISeasonOwnProps {
    seasonInfo: ISeasonInfo;
    teams: ITableTeamInfo[];
    players: ITablePlayerInfo[];

    isLoading: boolean;
    isLoadingSeasons: boolean;

    getTeamInfos(seasonId: number): void;
}

export interface ISeasonPageState {

}

function mapStateToProps(state: IStore, ownProps: ISeasonOwnProps): Partial<ISeasonPageProps> {
    return {
        seasonInfo: state.season.byId[ownProps.seasonId],
        teams: state.competition.teams,
        players: state.competition.players,

        isLoading: state.competition.UI.isLoading,
        isLoadingSeasons: state.season.UI.isLoading
    };
}

function mapDispatchToProps(dispatch: any): Partial<ISeasonPageProps> {
    return {
        getTeamInfos: (seasonId: number) => dispatch(CompetitionDuck.actionCreators.getTeamInfos(seasonId))
    };
}

class SeasonPage extends React.Component<ISeasonPageProps, ISeasonPageState> {
    constructor(props: ISeasonPageProps) {
        super(props);

    }

    componentDidMount() {
        this.props.getTeamInfos(this.props.seasonId);
    }

    @autobind
    _teamRowClicked(row: any) {
        return;
    }

    render() {
        const {
            seasonId,
            seasonInfo,
            teams,
            players,
            isLoadingSeasons,
            isLoading
        } = this.props;

        if (!seasonInfo || isLoadingSeasons || isLoading) {
            return <Loader active inline='centered' size='large' > Učitavanje... </Loader>;
        }

        return (
            <div className="season-page">
                <CustomText text={`${getSeasonDisplayName(seasonInfo.type)}, Sezona ${seasonInfo.godina}.`}
                    textType={CustomTextTypeEnum.mainHeader}
                    textAlign='center' />

                <CustomTable
                    className="team-table"
                    headers={teamHeaders}
                    data={teams}
                    rowKey='teamId'
                    onRowClicked={this._teamRowClicked}
                />

                <CustomText text={`Najbolji Pojedinci`}
                    textType={CustomTextTypeEnum.subHeader}
                    textAlign='center' />

                <CustomTable
                    className="players-table"
                    headers={playerHeaders}
                    data={players}
                    rowKey='playerId'
                    onRowClicked={this._teamRowClicked}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonPage);
