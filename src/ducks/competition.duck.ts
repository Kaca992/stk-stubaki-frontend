import { createSelector } from 'reselect';

import { fetcher, actionUtils, ICustomFetchOptions } from '../utils/fetcher';
import { IAction } from '../common/interfaces';
import { IStore } from '../store/index';
import { ITableTeamInfo } from '../common/dataStructures';
// action types

const actionTypes = {

};

// action creators

const actionCreators = {

};

// reducer

export interface ICompetitionState {
    teams: ITableTeamInfo[];
    UI: {
        isLoading: false
    };
}

const initialState: ICompetitionState = {
    teams: [],
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
