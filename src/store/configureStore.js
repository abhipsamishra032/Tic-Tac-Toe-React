// configureStore.js

import {createStore} from 'redux';
import rootReducer from '../reducers/reducer';

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}