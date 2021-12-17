const Book = require('./book.model')

const getBookCategories = async ( req, res ) =>{
    try{
        const categories = await Book.distinct('category')
                                    .lean()
                                    .exec();

        return res.status(200).json(categories);
    }catch(e){
        console.warn(e);
        return res.status(400).end();
    }
}

const getBookBySearch = async ( req ,res ) =>{
    if(req.query.search){
        const search = new RegExp(req.query.search + '$' , 'i');
        try{
            const bookByName = await Book.find({ name : search })
                                        .limit(20)
                                        .lean()
                                        .exec();
            await console.log( 'request :' ,req.query.search ,'\n' , 'result :' , bookByName)
            return res.status(200).json({ 
                                    bookByName : (!bookByName)?null:bookByName
                                })

        }catch(e){
            console.warn(e);
            return res.status(400).end();
        }
    }
    const { id } = req.query;
    try{
        const book = await Book.findById({_id : id })
                                .lean()
                                .exec();

        return res.status(200).json(book);
    }catch(e){
        console.warn(e);
        return res.status(400).end()
    }
}

const getSortedBooks = async ( req , res ) =>{
    try{

        let  { order , orderBy , category } = req.query;
        let result = await Book.find({ category })
                                .sort({ [orderBy] : parseInt(order) })
                                .limit(20)
                                .exec();                            
        return res.status(200).json(result);
    }catch(e){
        console.warn(e);
        return res.status(400).end();
    }
}

module.exports = {
    getBookCategories,
    getSortedBooks,
    getBookBySearch
};