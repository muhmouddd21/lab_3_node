require('dotenv').config();
let ejs = require('ejs');
const Authenticate = require("./middlewares/Authenticate")

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
app.use("/user",userRoutes)


app.get("/profile",Authenticate);


// Error handling middleware
app.use((err, req, res, next) => {

    if (process.env.NODE_ENV === 'development') {
        console.error('🔥 Error Stack:', err.stack);
    } else {
        console.error('🔥 Error:', err.message);
    }


    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})







