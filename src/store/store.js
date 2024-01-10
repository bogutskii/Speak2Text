import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import transcriptReducer from '../reducers/transcriptReducer';

const rootReducer = combineReducers({
  transcript: transcriptReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk) 
);

export default store;
