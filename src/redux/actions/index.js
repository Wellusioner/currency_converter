import { createRoutine } from 'redux-saga-routines';

const getCurrencies = createRoutine('GET_CURRENCIES');
const convertCurrency = createRoutine('CONVERT_CURRENCY');
const saveHistory = createRoutine('SAVE_HISTORY');
const removeHistory = createRoutine('REMOVE_HISTORY');

export default {
  getCurrencies,
  convertCurrency,
  saveHistory,
  removeHistory
}