const Product = require("../models/Product");
const { isValidObjectId } = require("mongoose");

const addProduct =async (req,res) => { 
 
        const { title,description } = req.body || {};

        if(!title || !description){
            return res.status(400).json({
                status:"failure",
                message:"no complete data",

            });
        }

        const newProduct = new Product();
        newProduct.title = title;
        newProduct.description =description;
        console.log(newProduct);
        
        await newProduct.save();
        res.status(201).json({
            status: "Success",
            message: "Product created successfully",
            data : newProduct,
        })
}; 
const getAllProducts = async(req,res)=>{
    const Products = await Product.find();
    res.json(Products);
}
const getProductById = async(req,res)=>{
    const id = req.params.id;
    const ProductGetten = await Product.findById(id);
    res.json(ProductGetten);
}
const deleteProduct = async(req,res)=>{
    const id = req.params.id;
    const ProductDeleted = await Product.findByIdAndDelete(id);
    res.json(ProductDeleted);
}
const editProduct = async (req,res)=>{
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
    const productUpdated = await Product.findByIdAndUpdate(id,{
         title: title,
         new: true 
        },{description:description, new: true});


        res.json(productUpdated);
    }
module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    deleteProduct,
    editProduct
};
