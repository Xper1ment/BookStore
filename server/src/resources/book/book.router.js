const { Router } = require('express');
const { 
    getBookCategories ,
    getSortedBooks,
    getBookBySearch     
} = require('./book.controller');

const router = Router('/');
// '/book'
router
    .route('/categories')
    .get(getBookCategories);

router
    .route('/sort/')
    .get(getSortedBooks);

router
    .route('/')
    .get(getBookBySearch)

module.exports = router;
