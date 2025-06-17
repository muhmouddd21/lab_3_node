const user = require('./../models/user');
const { isValidObjectId } = require("mongoose");

const register = async (req,res,next)=>{
    const {body} = req;
    console.log(body);
    res.send("done")
}

module.exports ={
    register
}