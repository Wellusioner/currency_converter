import { call, put, all, takeLatest } from 'redux-saga/effects'
import Actions from '../actions';
import { api } from '../../services';

function* getCurList(){
  try{
    const { data: { symbols } } = yield call(
      api.request.get,
      api.queryBuilder('/symbols')
    );

    yield put({
      type: Actions.getCurrencies.SUCCESS,
      payload: Object.values(symbols)
    });
  }
  catch(err){
    yield put(Actions.getCurrencies.failure(err));
  }
}

function* convertCur({ payload = {} }) {
  
  try{
    const { data: {result, date} } = yield call(
      api.request.get,
      api.queryBuilder('/convert', {...payload})
    )
    
    const data = {
      from: {
        code: payload.from,
        amount: payload.amount
      },
      to: {
        code: payload.to,
        amount: result.toFixed(2)
      },
      date
    }

    yield put({
      type: Actions.convertCurrency.SUCCESS,
      payload: data
    });

    yield put({
      type: Actions.saveHistory.SUCCESS,
      payload: data
    });

  }
  catch(err){
    yield put(Actions.convertCurrency.failure(err.message));
  }
}

export default function* root(){
  yield all([
    takeLatest(Actions.getCurrencies.REQUEST, getCurList),
    takeLatest(Actions.convertCurrency.REQUEST, convertCur)
  ]);
}