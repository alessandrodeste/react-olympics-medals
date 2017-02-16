import { combineReducers } from 'redux';
import medalsReducer from './medals_reducer';

export default combineReducers({
  medals: medalsReducer  
});
