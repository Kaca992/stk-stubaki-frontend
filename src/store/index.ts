import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import {CompetitionSelectorDuck, ICompetitionSelectorState} from './../ducks';

const middleware = [thunk, logger];

const reducersApp = combineReducers({
    competitionSelectorReducer: CompetitionSelectorDuck.reducer,
});

export interface IStore {
  competitionSelectorReducer: ICompetitionSelectorState;
}

function configureStore() {
    const store: any = createStore(reducersApp, composeWithDevTools(
        applyMiddleware(...middleware)),
    );
    return store;
}

export default configureStore;
