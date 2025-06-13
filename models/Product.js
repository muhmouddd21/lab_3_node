const mongoose = require('mongoose');
const schema = mongoose.Schema;

const productSchema = new schema({
    title: {
        type:String,
        required: true,
        minlength: 3,
        maxlength: 20,

    },
    description:{
        type:String,
        required: false,
        minlength: 3,
        maxlength: 100,
    }
})
const Product = mongoose.model("Products",productSchema);
module.exports = Product;