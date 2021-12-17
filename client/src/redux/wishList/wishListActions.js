import * as types from './wishListTypes';

export const addtoWishList = item => {
    return {
      type: types.ADD_TO_WISHLIST,
      payload: item
    }
}

export const addArraytoWishList = item =>{
    return {
      type : types.ADD_ARRAY_TO_WISHLIST,
      payload : item
    }
}

export const deletefromWishList = idx => {
    return {
      type: types.DELETE_FROM_WISHLIST,
      payload: idx
    }
}