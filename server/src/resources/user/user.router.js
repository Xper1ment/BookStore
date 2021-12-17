const { Router } = require('express');
const {
    getOne,
    createOne,
    updateOne,
    removeOne,
    getBookFromCart,
    addBookToCart,
    deleteBookFromCart,
    getWishList,
    posttoWishList,
    deletefromWishList
} = require('./user.controller');
//const { postAppValidator }= require('../../utils/validators')

const router = Router();
// '/api/user'
router
    .route('/')
    .get(getOne)
    .post(createOne)
    .put(updateOne)
    .delete(removeOne);
router
    .route('/cartItems')
    .get(getBookFromCart)
    .post(addBookToCart)
    .delete(deleteBookFromCart)

router
    .route('/wishList')
    .get(getWishList)
    .post(posttoWishList)
    .delete(deletefromWishList)
    
module.exports = router;
