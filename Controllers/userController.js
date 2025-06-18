const AppError = require('../utils/AppError');
const User = require('./../models/user');
const { isValidObjectId } = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const util = require("util");

const jwtsign = util.promisify(jwt.sign)
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

    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const createdUser = new User({
        email:email,
        name:name,
        password:hashedPassword
    })
    const user = await createdUser.save();

    res.status(200).json({
        email:user.email,
        user:user.name
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


    const isPasswordMatched = await bcrypt.compare(password,existingUser.password);

    if(!isPasswordMatched){
        const error = new Error("there is wrong data");
        error.status = 400; 
        return next(error);
    }

    const SECRET = process.env.JWT_SECRET;
    const payload = { id: existingUser._id};
    const token = await jwtsign(payload, SECRET, {
      expiresIn: "1d",
    });

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