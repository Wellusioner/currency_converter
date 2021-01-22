import Actions from '../actions';

const initialState = {
  list: []
}

function saveHistory(state=initialState, action){
  switch(action.type){
    case Actions.saveHistory.SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload]
      }
    case Actions.removeHistory.REQUEST:
      return {
        ...state,
        list: state.list.filter((_,index) => index !== action.payload)
      }
    default:
      return state
  }
}

export default saveHistory