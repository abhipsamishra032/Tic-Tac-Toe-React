// Reducers take state and an action as parameters and return new state
// We combine reducers and pass them as a parameter to the redux store

import { combineReducers } from 'redux';

import gameReducer from './gameReducer';


const appReducer = combineReducers({
  game: gameReducer,
});

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
