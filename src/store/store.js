import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import transcriptReducer from '../reducers/transcriptReducer';
import rulesReducer from '../reducers/rulesReducer';

const rootReducer = combineReducers({
  transcript: transcriptReducer,
  rulesControl: rulesReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) 
);

export default store;
