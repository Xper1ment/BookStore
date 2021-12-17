const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
         type : String,
         required : true 
    },
    wishlist : [{
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'book'
    }],
    bookCart :[{
        url : {
            type : String,
            trim : true
        },
        author : {
            type : String,
            trim : true
        },
        price : {
            type : Number,
            require : true
        },
        quantity : {
            type : Number,
            require : true,
        },
        currency :{
            type : String,
        },
        bookID : {
            type : mongoose.SchemaTypes.ObjectId,
            require : true
        },
        name : {
            type : String,
            require : true
        }
    }]
})

//mongoose pre hook for hashing password before saving password
userSchema.pre('save',function(next){
    if(!this.isModified('password'))
        return next();
    
    bcrypt.hash(this.password , 10 , (err , hash ) => {
        if(err)
            return err;
        this.password = hash;
        next();
    })
})
//mongoose pre hook for hashing password before updating password
userSchema.pre('findOneAndUpdate', function(next) {
    const update = this.getUpdate();
    if (update.password && update.password.length !== 0 ) {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(update.password, salt, (err, hash) => {
          this.getUpdate().password = hash;
          next();
        })
      })
    } else {
      next();
    }
  });

//mongoose virtual function for checking password
userSchema.methods.checkPassword = function(password){
    const passwordHash = this.password;
    return new Promise(( resolve , reject) => {
        bcrypt.compare( password , passwordHash , (err , same) =>{
            if(err)
                return reject(err);
            return resolve(same);
        })
})
}

const User = mongoose.model('user',userSchema);
module.exports = User;