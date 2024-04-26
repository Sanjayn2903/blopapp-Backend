const express = require('express')
const app = express()
const mongoose = require('mongoose') ;
// /const { default: router } = require('./routes/user-routes');
const router = require('./routes/user-routes');
const { blogRouter } = require('./routes/blog-routes');
const port = process.env.port  || 4000
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter)
//passwordd---- 6nGR8kjugBkgv905



mongoose.connect('mongodb+srv://sanjayn29:6nGR8kjugBkgv905@cluster0.ailftmc.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
   app.listen(port)
})
.then(()=>{
    console.log(`server is running on port ${port} \n and datbase is connnected`);
})
.catch((err)=>{
    console.log(`error ${err}`);
})

