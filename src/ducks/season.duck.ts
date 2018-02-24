import { createSelector } from 'reselect';

import {ISeasonInfo} from '../common/dataStructures';

import { fetcher, actionUtils, ICustomFetchOptions } from '../utils/fetcher';
import { IAction } from '../common/interfaces';
import { IStore } from '../store/index';
import { SeasonController } from '../constants/service.endpoints';
// action types

const actionTypes = {
    SEASON_LIST: '@season/SEASON_LIST'
};

// action creators

const actionCreators = {
    initSeasonsList() {
        return (dispatch) => {
            let url = SeasonController.allSeasons;
            let options: ICustomFetchOptions = {
                action: actionTypes.SEASON_LIST,
                hasResult: true
            };

            return fetcher(url, options, dispatch, {method: 'POST'});
        };
    },
};

// reducer

export interface ISeasonState {
    byId: { [key: string]: ISeasonInfo };
    allIds: number[];
    UI: {
        isLoading: boolean;
    };
}

const initialState: ISeasonState = {
    byId: {},
    allIds: [],
    UI: {
        isLoading: false
    }
};

const reducer = (state= initialState, action: IAction): ISeasonState => {
    switch (action.type) {
        case actionUtils.requestAction(actionTypes.SEASON_LIST):
            return {
                ...state,
                UI: {
                    ...state.UI,
                    isLoading: true
                }
            };
        case actionUtils.responseAction(actionTypes.SEASON_LIST):
            let seasons = action.payload as ISeasonInfo[];
            let allIds: number[] = [];
            let byId: { [key: string]: ISeasonInfo } = {};

            seasons.map(season => {
                byId[season.id] = season;
                allIds.push(season.id);
            });

            return {
                ...state,
                allIds,
                byId,
                UI: {
                    ...state.UI,
                    isLoading: false
                }
            };
        case actionUtils.errorAction(actionTypes.SEASON_LIST):
            return {
                ...state,
                UI: {
                    ...state.UI,
                    isLoading: false
                }
            };
    }
    return state;
};

// selectors

const getSeasons = (state: IStore) => state.season.byId;
const getAllIds = (state: IStore) => state.season.allIds;

const selectors = {
    getAllSeasons : createSelector(
        [ getSeasons, getAllIds ],
        (seasons, allIds) => allIds.map(id => seasons[id])
    )
};

export const SeasonDuck = {
    actionTypes,
    actionCreators,
    reducer,
    selectors
};
