import * as types from './bookCartTypes';

const initialState = {
    item : [],
}

const bookCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TO_BOOKCART: return {
      ...state,
      item: [ ...state.item , action.payload ],
    }
    case types.ADD_ARRAY_TO_BOOKCART:return {
      ...state,
      item : [ ...state.item , ...action.payload ]
    }
    case types.DELETE_FROM_BOOKCART: return {
        ...state,
        item: state.item.filter((it) => it.bookID !== action.payload.bookID )
    }
    case types.UPDATE_BOOK_IN_BOOKCART:{
        const index = state.item.findIndex((it) => it.bookID === action.payload.bookID);
        const newArray = [...state.item];
        newArray[index].quantity = action.payload.quantity;
        return{
          ...state,
          item : newArray,
        }
    }
    default: return state
  }
}

export default bookCartReducer;