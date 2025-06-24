const Post = require("../models/Post");
const { isValidObjectId } = require("mongoose");
const Logger = require('../services/logger.service');
const logger = new Logger('post.controller');
const addPost =async (req,res) => { 
 
        const { title,description } = req.body || {};

        if(!title || !description){
            return res.status(400).json({
                status:"failure",
                message:"no complete data",

            });
        }

        const newPost = new Post();
        newPost.title = title;
        newPost.description =description;

        
        await newPost.save();
        res.status(201).json({
            status: "Success",
            message: "Product created successfully",
            data : newPost,
        })
}; 
const getAllPosts = async(req,res)=>{
    const Posts = await Post.find();
    // logger.error("dsdasdsada",Posts[0])
    // logger.info("return all posts ",Posts[0]);
    res.json(Posts);
}
const getPostById = async(req,res)=>{
    const id = req.params.id;
    const PostGetten = await Post.findById(id);
    res.json(PostGetten);
}
const deletePost = async(req,res)=>{
    const id = req.params.id;
    const PostDeleted = await Post.findByIdAndDelete(id);
    res.json(PostDeleted);
}
const editPost = async (req,res)=>{
    const {id } = req.params || {};
    const {title,description} = req.body || {};

       if(!title || !description){
            return res.status(400).json({
                status:"failure",
                message:"no complete data",

            });
        }

        if (!isValidObjectId(id)) {
            return res.status(400).json({
            status: "Failure",
            message: "Invalid user id",
            });
        }
    const postUpdated = await Post.findByIdAndUpdate(id,{
         title: title,
         new: true 
        },{description:description, new: true});


        res.json(postUpdated);
    }
module.exports = {
    addPost,
    getAllPosts,
    getPostById,
    deletePost,
    editPost
};
