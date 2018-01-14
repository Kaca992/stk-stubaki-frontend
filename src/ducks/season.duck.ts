import {Action} from 'redux';
import {ISeasonInfo} from '../common/dataStructures';

import { fetcher, ICustomFetchOptions } from '../utils/fetcher';
// action types

const actionTypes = {
    SEASON_LIST_REQUEST: 'SEASON_LIST_REQUEST',
    SEASON_LIST_RESPONSE: 'SEASON_LIST_RESPONSE',
    SEASON_LIST_ERROR: 'SEASON_LIST_ERROR',
};

// action creators

const actionCreators = {
    getSeasonsList() {
        return (dispatch) => {
            let url = 'api/raspored';
            let options: ICustomFetchOptions = {
                requestAction: actionTypes.SEASON_LIST_REQUEST,
                responseAction: actionTypes.SEASON_LIST_RESPONSE,
                errorAction: actionTypes.SEASON_LIST_ERROR,
                hasResult: true
            };

            fetcher(url, options, dispatch);
        };
    },
};

// reducer

export interface ISeasonState {
    byId: { [key: string]: ISeasonInfo };
    allIds: number[];
    UI: {
       isLoading?: boolean
    };
}

const initialState: ISeasonState = {
    byId: {},
    allIds: [],
    UI: {
        isLoading: false
    }
};

const reducer = (state= initialState, action: Action): ISeasonState => {
    switch (action.type) {
        case actionTypes.SEASON_LIST_REQUEST:
            return {
                ...state,
                UI: {
                    isLoading: true
                }
            };
        case actionTypes.SEASON_LIST_RESPONSE:
            return {
                ...state,
                UI: {
                    isLoading: false
                }
            };
    }
    return state;
};

export const SeasonDuck = {
    actionTypes,
    actionCreators,
    reducer,
};
