const { default: mongoose } = require('mongoose');
const Blog = require('../models/Blog');
const User = require('../models/User');

const getAllBlogs = async(req,res,next)=>{
    let blogs;
    try{
        blogs = await Blog.find();
    }catch(err){
        return console.log(err);
    }
    if(!blogs){
        return res.status(404).json({message: 'No blogs found'})
    }
    return res.status(200).json(blogs)
}
const addBlog = async(req,res,next)=>{
    const {title,image,user} = req.body;
    let existingUser;
    try{
        existingUser = await User.findById(user);
    }catch(err){
        console.log(err);
    }
    if(!existingUser){
        return res.status(401).json({message:'Invalid user.'});
    }
    const blog = new Blog({
        title,image,user
    })
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existingUser.blogs.push(blog);
        await existingUser.save({session});
        await session.commitTransaction();
    }catch(e){
        console.log(e);
        return res.status(500).json({message:e})
    }
    console.log("added successfully");
    return res.status(200).json(blog)
}
const updateBlog = async(req,res,next)=>{

    const {title,user} = req.body;
    const blogId =  req.params.id;
    let blog;
    try{
     blog = await Blog.findByIdAndUpdate(blogId,{
     title,
     user
    })
}catch(err){
    return console.log(err);
}
if(!blog)
return res.status(404).json({message:"Blog not Found"});

console.log("Blog found");
return res.status(200).json(blog);
}

const getById = async(req,res,next)=>{
    const id = req.params.id;
    let blog;
    try{
      blog =  await Blog.findById(id);
    }catch(err){
        return res.status(404).json({message:"blog not found"})
    }
    if(!blog){
        return res.status(404).json({message: "Blog Not Found"})
    }
    return res.status(200).json(blog);
}

const deleteBlog = async(req,res,next)=>{
    const  id= req.params.id;
    let blog;
    try{
      blog= await Blog.findByIdAndDelete(id).populate("user");
      await blog.user.blogs.pull(blog)
      await blog.user.save();
    }catch(err){
        console.log(err);
    }
    if(!blog){
        return res.status(404).json({message:"Blog is already deleted!"});
    }
    return res.status(200).json("Successfully deleted");
}

const getByUserId = async(req,res,next)=>{
   const userId = req.params.id;
   let userBlogs;
   try{
    userBlogs = await User.findById(userId).populate("blogs");
   }catch(err){
    return console.log(err);
   }
   if(!userBlogs){
    return res.status(404).json({messae:'no blogs found'})
   }
   console.log(userBlogs);
   return res.status(200).json({blogs:userBlogs})
}
module.exports = {getAllBlogs,addBlog,updateBlog,getById,deleteBlog,getByUserId};

