import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { rocketsReducer } from './rockets/rockets';
import { missionsReducer } from './missions/missions';

const rootReducer = combineReducers({
  missionsReducer,
  rocketsReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger, thunk));

export default store;
