import * as types from './searchTypes';

export const addtoSearch = item => {
    return {
      type: types.ADD_TO_SEARCH,
      payload : item
    }
}
