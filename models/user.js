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
        maxlength: 20,

    },
    password:{
        type:String,
        required:true,
        minlength: 3,
        maxlength: 20,
    },
    confirmPassword :{
        type:String,
        required:true,
        minlength: 3,
        maxlength: 20,
    }

})
userSchema.index({email:1},{unique:true});