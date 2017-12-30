import {applyMiddleware, combineReducers, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import {SeasonDuck, ISeasonState} from './../ducks';

const middleware = [thunk, logger];

const reducersApp = combineReducers({
    seasonReducer: SeasonDuck.reducer,
});

export interface IStore {
  seasonReducer: ISeasonState;
}

function configureStore() {
    const store: any = createStore(reducersApp, composeWithDevTools(
        applyMiddleware(...middleware)),
    );
    return store;
}

export default configureStore;
