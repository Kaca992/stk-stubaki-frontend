import { createSelector } from 'reselect';

import { fetcher, actionUtils, ICustomFetchOptions } from '../utils/fetcher';
import { IAction } from '../common/interfaces';
import { IStore } from '../store/index';
import { ITableTeamInfo } from '../common/dataStructures';
import { CompetitionController } from '../constants/service.endpoints';
// action types

const actionTypes = {
    GET_TEAM_INFOS : '@competition/GET_TEAM_INFOS'
};

// action creators

const actionCreators = {
    getTeamInfos(seasonId: number) {
        return (dispatch, getState) => {
            let url = CompetitionController.getTeamInfos(seasonId);
            let options: ICustomFetchOptions = {
                action: actionTypes.GET_TEAM_INFOS,
                hasResult: true
            };

            return fetcher(url, options, dispatch, {method: 'GET'});
        };
    }
};

// reducer

export interface ICompetitionState {
    teams: ITableTeamInfo[];

    UI: {
        isLoadingTeams: boolean;
    };
}

const initialState: ICompetitionState = {
    teams: [],

    UI: {
        isLoadingTeams: true
    }
};

const reducer = (state= initialState, action: IAction): ICompetitionState => {
    switch (action.type) {
        case actionUtils.requestAction(actionTypes.GET_TEAM_INFOS):
            return {
                ...state,
                UI: {
                    ...state.UI,
                    isLoadingTeams: true
                }
            };
        case actionUtils.responseAction(actionTypes.GET_TEAM_INFOS):
            return {
                ...state,
                teams: action.payload.teams,
                UI: {
                    ...state.UI,
                    isLoadingTeams: false
                }
            };
        case actionUtils.errorAction(actionTypes.GET_TEAM_INFOS):
            return {
                ...state,
                UI: {
                    ...state.UI,
                    isLoadingTeams: false
                }
            };
    }
    return state;
};

// selectors
const selectors = {

};

export const CompetitionDuck = {
    actionTypes,
    actionCreators,
    reducer,
    selectors
};
