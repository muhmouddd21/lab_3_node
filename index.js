require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose')

const productRoutes = require("./Routers/ProductRouter");
const postRoutes = require("./Routers/PostRouter")
const app = express();

app.use(express.json());
app.use("/products", productRoutes);
app.use("/posts", postRoutes);

const port = process.env.PORT;
const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri)
    .then(()=>{
        console.log("done connected");
    })
    .catch((error)=>{
        console.log("there is error with connecting with db",error);
        
    })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




