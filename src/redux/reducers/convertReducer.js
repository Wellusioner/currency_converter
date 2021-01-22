import Actions from '../actions';

const initialState = {
  isFetched: true,
  result: {},
  error: null
}

function convertCurrency(state = initialState, action){
  switch(action.type){
    case Actions.convertCurrency.REQUEST:
      return {
        ...state,
        isFetched: false,
        error: null
      }
    case Actions.convertCurrency.SUCCESS:
      return {
        ...state,
        isFetched: true,
        result: action.payload,
        error: null
      }
    case Actions.convertCurrency.FAILURE:
      return {
        ...state,
        isFetched: true,
        error: action.payload
      }
    default:
      return state
  }
}

export default convertCurrency