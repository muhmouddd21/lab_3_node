const AppError = require('../utils/AppError');
const User = require('./../models/user');

const { isValidObjectId } = require("mongoose");
const bcrypt = require('bcrypt');




const checkIfEmailExists = async(email)=>{
    const user = await User.findOne({ email: email });
    return user;
}

const register = async (req,res,next)=>{

    try {
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
    const existingUser = await checkIfEmailExists(email);
    if(existingUser !== null){ // to check if the email exists or not
        const error = new Error("Email is exists");
        error.status = 400; 
        return next(error);
    }

    const createdUser = new User({
        email:email,
        name:name,
        password:password,
        role:'user'
    })
    const user = await createdUser.save();

    res.status(200).json({
        email:user.email,
        user:user.name,
        password:user.password
    })

    } catch (err) {
        err.statusCode = 422;
        next(err);
    }
   
}   
const login = async(req,res,next)=>{
     try {
    const {email,password} = req.body;
    if(!email  || !password ){
        const error = new Error("All fields are required");
        error.status = 400; 
        return next(error);
    }

    const existingUser = await checkIfEmailExists(email);
    if(existingUser === null){ // to check if the email exists or not
        const error = new Error("there is wrong data");
        error.status = 400; 
        return next(error);
    }


    const isPasswordMatched = existingUser.checkPassword(password);

    if(!isPasswordMatched){
        const error = new Error("there is wrong data");
        error.status = 400; 
        return next(error);
    }

    const token = await existingUser.generateToken();

     res.status(200).json({
        data:{token}
    })

    } catch (err) {
        err.statusCode = 422;
        next(err);
    }
}
module.exports ={
    register,
    login
}