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
import { ISeasonInfo, ITableTeamInfo } from '../../common/dataStructures';
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

    isLoadingTeams: boolean;
    isLoadingSeasons: boolean;

    getTeamInfos(seasonId: number): void;
}

export interface ISeasonPageState {

}

function mapStateToProps(state: IStore, ownProps: ISeasonOwnProps): Partial<ISeasonPageProps> {
    return {
        seasonInfo: state.season.byId[ownProps.seasonId],
        teams: state.competition.teams,

        isLoadingTeams: state.competition.UI.isLoadingTeams,
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

    render() {
        const {
            seasonId,
            seasonInfo,
            teams,
            isLoadingSeasons,
            isLoadingTeams
        } = this.props;

        if (!seasonInfo || isLoadingSeasons || isLoadingTeams) {
            return <Loader active inline='centered' size='large' > Učitavanje... </Loader>;
        }

        return (
            <div>
                <CustomText text={`${getSeasonDisplayName(seasonInfo.type)}, Sezona ${seasonInfo.godina}.`}
                            textType={CustomTextTypeEnum.mainHeader}
                            textAlign='center'/>

                <CustomTable
                    headers={headers}
                    data={teams}
                    rowKey='teamId'
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SeasonPage);
