import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { worldMap, service } from './Reducers';
import { sagaWatcher } from './Sagas';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const composeEnhancers = (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) || compose;

const rootReducer = combineReducers({ worldMap: worldMap, service: service });

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(sagaWatcher);
