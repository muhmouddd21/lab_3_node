const mongoose = require('mongoose');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const util = require("util");
const jwtsign = util.promisify(jwt.sign);
const jwtVerify = util.promisify(jwt.verify);
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
    }

},{
    toJSON: {
        transform:(doc,ret)=>{
            return _.omit(ret,['__v','password']);
        }
    }

})
userSchema.index({email:1},{unique:true});


userSchema.pre('save',async function(){
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    const currentDoc =this;
    if(currentDoc.isModified('password')){
        currentDoc.password = await bcrypt.hash(currentDoc.password, SALT_ROUNDS)
    }
    
})

userSchema.methods.checkPassword = async function(password){
    const currentDoc =this;
    return await bcrypt.compare(password,currentDoc.password)
}

userSchema.methods.generateToken = async function(){
    const currentDoc =this;
    const SECRET = process.env.JWT_SECRET;
    const payload = { id: currentDoc._id};
    return  await jwtsign(payload, SECRET, {
      expiresIn: "1d",
    });
}


userSchema.statics.verifyUser = async function(token){
    const User = this;
    try{
        const {id } = await jwtVerify(token,process.env.JWT_SECRET);
        return await User.findById(id);
    }catch(err){
        const Errr = new Error("You are not Authorized");
        Errr.status = 401; 
        throw Errr;
    }

}

const User = mongoose.model("User",userSchema);


module.exports = User;