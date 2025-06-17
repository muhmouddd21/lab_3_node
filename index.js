require('dotenv').config();
let ejs = require('ejs');
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

console.log('Using MONGO_URI:', mongoUri);
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');
app.use(express.json());

mongoose.connect(mongoUri)
    .then(()=>{
        console.log("done connected");
    })
    .catch((error)=>{
        console.log("there is error with connecting with db",error);
        
    })


const productRoutes = require("./Routers/ProductRouter");
const postRoutes = require("./Routers/PostRouter");
const userRoutes = require ("./Routers/userRouter");
app.use("/posts", postRoutes);

app.use("/products", productRoutes);


// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error occurred:', err);
    res.status(500).json({
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})







