import { createStore, combineReducers } from 'redux';
import transcriptReducer from '../reducers/transcriptReducer';

const rootReducer = combineReducers({
  transcript: transcriptReducer,
  
});

const store = createStore(rootReducer);

export default store;
