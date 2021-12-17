import * as types from './bookCartTypes';

export const addtoBookCart = item => {
    return {
      type: types.ADD_TO_BOOKCART,
      payload: item
    }
}
export const addArraytoBookCart = arr =>{
    return{
      type : types.ADD_ARRAY_TO_BOOKCART,
      payload : arr
    }
}
export const deletefromBookCart = item => {
    return {
      type: types.DELETE_FROM_BOOKCART,
      payload: item
    }
}
export const updateBookinBookCart = item =>{
    return {
      type: types.UPDATE_BOOK_IN_BOOKCART,
      payload : item
    }
}