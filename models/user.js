const mongoose = require('mongoose');
const { type } = require('os');
const schema = mongoose.Schema;
const userSchema = new schema({
    email:{
        type:String,
        required:true,

    },
    name:{
        type:String,
        required: true,
        minlength: 3,
        maxlength: 100,

    },
    password:{
        type:String,
        required:true,
        minlength: 3,
        maxlength: 100,
    },
    role:{
        type:String,
        required:true,
        role:String
    }

})
userSchema.index({email:1},{unique:true});
const User = mongoose.model("User",userSchema);
module.exports = User;