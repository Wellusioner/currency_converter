import { combineReducers } from 'redux';
import convertReducer from './convertReducer';
import currencyReducer from './currencyReducer';
import historyReducer from './historyReducer';

export default combineReducers({
  convert: convertReducer,
  currency: currencyReducer,
  history: historyReducer
});