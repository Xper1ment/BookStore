const User = require('./user.model')


const getOne = async ( req ,res ) => {
    try{
     
        let doc = await User.findOne({ _id : req.user._id})
            .populate('wishlist')
            .exec()
        if(!doc) return res.status(400).end();
    
        return res.status(200).json(doc);
        
     }catch(e){
        console.error(e);
        return res.status(400).end();
     }
}

const createOne = async (req , res) =>{
    try{
        
        let doc = await User.create({...req.body});
        return res.status(200).json({ message : 'Signed up successfully.' })
    }catch(e){
        console.error(e);
        return res.status(400).end();
    }
} 

const updateOne = async (req , res) => {
    try{
        let doc = await User.findOneAndUpdate({ _id : req.user._id },
                                                    req.body,
                                                    { new : true })
                                                    .lean()
                                                    .exec()

    if(!doc) return res.status(400).end();
    return res.status(200).end();

    }catch(e){
        console.error(e);
        return res.status(400).end();
    }
}

const removeOne = User => async (req , res) => {
    try{
       let user =  await User.findOneAndDelete({ _id : req.user._id }).exec();
       return res.status(200).send(`${User} removed`)
    
    }catch(e){
        console.error(e);
        return res.status(400).end();
    }
}

const getBookFromCart = async (req ,res) =>{
    try{
        const cartListItem = await User.findById({ _id : req.user._id })
                                    .select('bookCart')
                                    .lean()
                                    .exec();

        return res.status(200).json(cartListItem.bookCart);
    }catch(e){
        console.warn(e);
        return res.status(400).end();        
    } 
}

const addBookToCart = async (req , res) =>{
    try{
        console.log(req.body.sendToCart)
        await User.findByIdAndUpdate({_id : req.user._id },
                                        { $set : {
                                            bookCart : req.body.sendToCart
                                        }}
                                    ).exec();
        return res.status(200).json({ message : 'ok' });

    }catch(e){
        console.warn(e);
        return res.status(400).end();
    } 
}

const deleteBookFromCart = async (req , res)=>{
    try{
        await User.findByIdAndUpdate({_id : req.user._id},
                                    {
                                        $set : {
                                            bookCart : req.body.sendToCart
                                        }
                                    }
                                ).exec();
        
        return res.status(200).json({ message : 'ok'});
    }catch(e){
        console.warn(e);
        return res.status(400).end();
    }
}

const getWishList = async (req, res) =>{
    try{
        const result = await User.findById({ _id : req.user._id})
                                    .populate('wishlist')
                                    .select('wishlist')
                                    .lean()
                                    .exec();
        return res.status(200).json(result.wishlist);

    }catch(e){
        console.warn(e);
        return res.status(400).end();
    }
}

const posttoWishList = async( req , res ) =>{
    try{
        await User.findByIdAndUpdate({_id : req.user._id},
                                {
                                    $set : {
                                        wishlist : req.body.bookID
                                    }
                                }).exec();
        return res.status(200).json({ message : 'success' });
    }catch(e){
        console.warn(e);
        return res.status(400).end();
    }
}
const deletefromWishList =async (req , res ) =>{
    try{
        await User.findByIdAndUpdate({_id : req.user._id},
                                {
                                    $pull : {
                                        wishList : req.body.bookID
                                    }
                                }).exec();
        return res.status(200).end();
    }catch(e){
        console.warn(e);
        return res.status(400).end();
    }
}

module.exports = {
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
};