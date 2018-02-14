import { createSelector } from 'reselect';

import { fetcher, actionUtils, ICustomFetchOptions } from '../utils/fetcher';
import { IAction } from '../common/interfaces';
import { IStore } from '../store/index';
// action types

const actionTypes = {

};

// action creators

const actionCreators = {

};

// reducer

export interface ICompetitionState {
    UI: {
        isLoading: false
    };
}

const initialState: ICompetitionState = {
    UI: {
        isLoading: false
    }
};

const reducer = (state= initialState, action: IAction): ICompetitionState => {
    switch (action.type) {

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
