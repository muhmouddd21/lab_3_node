const AppError = require('../utils/AppError');
const user = require('./../models/user');
const { isValidObjectId } = require("mongoose");
const bcrypt = require('bcrypt');
const register = async (req,res,next)=>{
    const {email,name,password,confirmPassword} = req.body;
    if(!email || !name || !password || !confirmPassword){
        const error = new Error("All fields are required");
        error.status = 400; 
        return next(error);
    }
    if(password !==confirmPassword){
        const error = new Error("passwords aren't matched");
        error.status = 400; 
        return next(error);
    }
    bcrypt.hash()
    console.log(user);
    res.status(200).json("mdsladsakl")
}   

module.exports ={
    register
}