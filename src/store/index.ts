import {applyMiddleware, createStore} from 'redux';
import logger from 'redux-logger';
import thunk from "redux-thunk";

const middleware = [thunk, logger];

function configureStore(initialState) {
    const store: any = createStore(null, applyMiddleware(...middleware));
    return store;
}

export default configureStore;
