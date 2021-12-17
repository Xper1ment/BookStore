const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required: true
    },
    author :{
        type : String,
        trim : true,
    },
    image : {
        type : String,
        trim : true,
    },
    format : {
        type : String,
        trim : true,
    },
    book_depository_stars : {
        type : Number,
        trim : true,
    },
    price : {
        type : Number,
        trim : true,
        required: true
    },
    currency : {
        type : String,
        trim : true,
        required: true
    },
    old_price :{
        type : Number,
        trim : true,
    },
    isbn :{
        type : Number,
        trim : true,
        required: true,
    },
    category : {
        type : String,
        trim : true,
        required: true
    },
    img_paths : {
        type : String,
        trim : true,
    },
    discount :{
        type : Number,
    }
})
bookSchema.index({ isbn : 1 });

const Book = mongoose.model('book',bookSchema);

module.exports = Book;