import { createSelector } from 'reselect';
import { IAction } from '../common/interfaces';
import { IStore } from '../store/index';
import { actionUtils } from '../utils/fetcher';
import {SeasonDuck} from './season.duck';

// action types
const actionTypes = {

};

// action creators
const actionCreators = {

};

// reducer
export interface IMainState {
    isLoading: boolean;
}

const initialState: IMainState = {
    isLoading: false
};

const reducer = (state= initialState, action: IAction): IMainState => {
    switch (action.type) {
        case actionUtils.requestAction(SeasonDuck.actionTypes.SEASON_LIST):
            return {
                ...state,
                isLoading: true
            };
        case actionUtils.responseAction(SeasonDuck.actionTypes.SEASON_LIST):
        case actionUtils.errorAction(SeasonDuck.actionTypes.SEASON_LIST):
            return {
                ...state,
                isLoading: false
            };
    }
    return state;
};

// selectors
const selectors = {

};

export const MainDuck = {
    actionTypes,
    actionCreators,
    reducer,
    selectors
};
