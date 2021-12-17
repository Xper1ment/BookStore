import { combineReducers } from 'redux';
import bookCartReducer from './bookCart/bookCartReducer';
import wishListReducer from './wishList/wishListReducer';
import searchReducer from './search/searchReducer';

const rootReducer = combineReducers({
    bookCart: bookCartReducer,
    wishList: wishListReducer,
    search : searchReducer
})

export default rootReducer;