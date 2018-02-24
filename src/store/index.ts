import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import {SeasonDuck, ISeasonState, CompetitionDuck, ICompetitionState, MainDuck, IMainState} from './../ducks';

const middleware = [thunk, logger];

const reducersApp = combineReducers({
    main: MainDuck.reducer,
    season: SeasonDuck.reducer,
    competition: CompetitionDuck.reducer
});

export interface IStore {
  main: IMainState;
  season: ISeasonState;
  competition: ICompetitionState;
}

function configureStore() {
    const store: any = createStore(reducersApp, composeWithDevTools(
        applyMiddleware(...middleware)),
    );
    return store;
}

export default configureStore;
