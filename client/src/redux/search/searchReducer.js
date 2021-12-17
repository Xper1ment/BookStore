import * as types from './searchTypes';

const initialState = {
    item : ''
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_SEARCH: return {
      ...state,
      item: action.payload
    }
    default: return state
  }
}

export default searchReducer;