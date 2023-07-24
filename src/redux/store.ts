import { createStore, combineReducers } from 'redux';
import countReducer from './reducers/countReducer'; 

const rootReducer = combineReducers({
  count: countReducer,
  // Add more reducer properties here for other parts of the state if needed
});

const store = createStore(rootReducer);

export default store;