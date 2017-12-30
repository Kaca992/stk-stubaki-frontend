import {Action} from 'redux';
import {ISeason} from '../common/dataStructures';
// action types

const actionTypes = {
    SEASON_LIST_REQUEST: 'SEASON_REQUEST',
};

// action creators

const actionCreators = {
    getSeasonsList() {
        return (dispatch) => {
            dispatch({type: actionTypes.SEASON_LIST_REQUEST});
        };
    },
};

// reducer

export interface ISeasonState {
    byId: { [key: string]: ISeason };
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
    }
    return state;
};

export const SeasonDuck = {
    actionTypes,
    actionCreators,
    reducer,
};
