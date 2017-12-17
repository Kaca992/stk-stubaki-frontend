import {Action} from 'redux';
import actionCreatorFactory, {isType} from 'typescript-fsa';

// action parameters types

interface ITest2Type {
    a: string;
    b: number;
}
// action types

const actionCreator = actionCreatorFactory();

const actionTypes = {
    TEST: actionCreator<{foo: string}>('TEST'),
    TEST2: actionCreator<{params: ITest2Type}>('TEST2'),
};

// action creators

const actionCreators = {
    test(foo: string) {
        return (dispatch) => {
            dispatch(actionTypes.TEST({foo}));
        };
    },

    test2(params: ITest2Type) {
        return (dispatch) => {
            dispatch(actionTypes.TEST2({params}));
        };
    },
};

// reducer

export interface ICompetitionSelectorState {
    test: number;
    foo: string;
}

const initialState: ICompetitionSelectorState = {
    test: -1,
    foo: '',
};

const reducer = (state= initialState, action: Action): ICompetitionSelectorState => {
    if (isType(action, actionTypes.TEST)) {
      return {...state, foo: action.payload.foo};
    }
    return state;
};

export const CompetitionSelectorDuck = {
    actionTypes,
    actionCreator,
    reducer,
};
