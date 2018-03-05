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
import { ISeasonInfo, ITableTeamInfo, ITablePlayerInfo, IHeadToHeadDict } from '../../common/dataStructures';
import { getSeasonDisplayName } from '../../utils/displayFormaters';
import { CompetitionDuck } from '../../ducks';
import { withRouter } from 'react-router';
import CustomText from '../../components/customText/customText';
import { CustomTextTypeEnum, HeadToHeadStatusEnum } from '../../common/enums';

export interface ISeasonOwnProps {
    seasonId: any;
}

export interface ISeasonPageProps extends ISeasonOwnProps {
    seasonInfo: ISeasonInfo;
    teams: ITableTeamInfo[];
    players: ITablePlayerInfo[];
    teamHeadToHeads: IHeadToHeadDict;
    playersHeadToHeads: IHeadToHeadDict;

    isLoading: boolean;
    isLoadingSeasons: boolean;

    getTeamInfos(seasonId: number): void;
}

export interface ISeasonPageState {
    teamIdClicked: number;
    playerIdClicked: number;
}

function mapStateToProps(state: IStore, ownProps: ISeasonOwnProps): Partial<ISeasonPageProps> {
    return {
        seasonInfo: state.season.byId[ownProps.seasonId],
        teams: state.competition.teams,
        players: state.competition.players,
        teamHeadToHeads: state.competition.teamHeadToHeads,
        playersHeadToHeads: state.competition.playersHeadToHeads,

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
        this.state = {
            teamIdClicked: -1,
            playerIdClicked: -1
        };
    }

    componentDidMount() {
        this.props.getTeamInfos(this.props.seasonId);
    }

    @autobind
    _teamRowClicked(row: any) {
        const rowId = this.state.teamIdClicked === row.teamId ? -1 : row.teamId;

        this.setState({
            teamIdClicked: rowId
        });
    }

    @autobind
    _playerRowClicked(row: any) {
        const rowId = this.state.playerIdClicked === row.playerId ? -1 : row.playerId;

        this.setState({
            playerIdClicked: rowId
        });
    }

    @autobind
    _getRowClassName(status: HeadToHeadStatusEnum) {
        switch (status) {
            case HeadToHeadStatusEnum.Positive:
                return "positive-score";
            case HeadToHeadStatusEnum.Negative:
                return "negative-score";
            default:
                return "";
        }
    }

    @autobind
    _generateTeamRowClasses(clickedTeamId: number) {
        if (clickedTeamId === -1) {
            return undefined;
        }

        const rowClasses: {[rowId: string]: string} = {};
        const teamHeadToHeadInfos = this.props.teamHeadToHeads[clickedTeamId];

        if (teamHeadToHeadInfos === undefined) {
            return undefined;
        }

        rowClasses[clickedTeamId] = 'neutral-score';
        teamHeadToHeadInfos.forEach(opponent => {
            rowClasses[opponent.opponentId] = this._getRowClassName(opponent.scoreStatus);
        });

        return rowClasses;
    }

    @autobind
    _generatePlayerRowClasses(clickedPlayerId: number) {
        if (clickedPlayerId === -1) {
            return undefined;
        }

        const rowClasses: {[rowId: string]: string} = {};
        const playerHeadToHeadInfos = this.props.playersHeadToHeads[clickedPlayerId];

        if (playerHeadToHeadInfos === undefined) {
            return undefined;
        }

        rowClasses[clickedPlayerId] = 'neutral-score';
        playerHeadToHeadInfos.forEach(opponent => {
            rowClasses[opponent.opponentId] = this._getRowClassName(opponent.scoreStatus);
        });

        return rowClasses;
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

        const teamRowClasses = this._generateTeamRowClasses(this.state.teamIdClicked);
        const playerRowClasses = this._generatePlayerRowClasses(this.state.playerIdClicked);

        const teamsClassName = classNames('team-table', {
            clicked: this.state.teamIdClicked !== -1
        });

        const playersClassName = classNames('players-table', {
            clicked: this.state.playerIdClicked !== -1
        });

        return (
            <div className="season-page">
                <CustomText text={`${getSeasonDisplayName(seasonInfo.type)}, Sezona ${seasonInfo.godina}.`}
                    textType={CustomTextTypeEnum.mainHeader}
                    textAlign='center'
                    />

                <CustomTable
                    className={teamsClassName}
                    headers={teamHeaders}
                    data={teams}
                    rowKey='teamId'
                    isStripped
                    rowClassNames={teamRowClasses}
                    onRowClicked={this._teamRowClicked}
                />

                <CustomText text={`Najbolji Pojedinci`}
                    textType={CustomTextTypeEnum.subHeader}
                    textAlign='center' />

                <CustomTable
                    className={playersClassName}
                    headers={playerHeaders}
                    data={players}
                    rowKey='playerId'
                    isStripped
                    rowClassNames={playerRowClasses}
                    onRowClicked={this._playerRowClicked}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonPage);
