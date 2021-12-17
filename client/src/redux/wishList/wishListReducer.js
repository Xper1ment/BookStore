import * as types from './wishListTypes';

const initialState = {
    item : []
}

const wishListReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_WISHLIST: return {
      ...state,
      item: [ ...state.item , action.payload ],
    }
    case types.ADD_ARRAY_TO_WISHLIST:return {
      ...state,
      item : [ ...action.payload ]
    }
    case types.DELETE_FROM_WISHLIST: return {
        ...state,
        item: state.item.filter((item) => item._id !== action.payload._id )
    }
    default: return state
  }
}

export default wishListReducer;