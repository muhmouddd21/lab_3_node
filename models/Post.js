const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: false,
    }
})

const postModel = mongoose.model("Posts",PostSchema);

module.exports = postModel;