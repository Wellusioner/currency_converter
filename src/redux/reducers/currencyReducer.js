import Actions from '../actions';

const initialState = {
  isFetched: true,
  list: [],
  error: null
}

function getCurrencies(state = initialState, action){
  switch(action.type){
    case Actions.getCurrencies.REQUEST:
      return {
        ...state,
        isFetched: false,
        error: null
      }
    case Actions.getCurrencies.SUCCESS:
      return {
        ...state,
        isFetched: true,
        list: [...action.payload],
        error: null
      }
    case Actions.getCurrencies.FAILURE:
      return {
        ...state,
        isFetched: true,
        error: action.payload
      }
    default:
      return state
  }
}

export default getCurrencies