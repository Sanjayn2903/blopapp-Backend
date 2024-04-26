const User = require('../models/User')
const bcrypt = require('bcrypt');



const getAllUser = async(req,res,next)=>{
    let users;
    try{
        users = await User.find();
    }
    catch(err){
        console.log(err);
    }
    if(!users) {
        return res.status(404).json({message:"no users found"});
    }
    return res.status(200).json({users});
}
const signup  = async (req,res,next) =>{
    const {name,email,password} = req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user already exits"});
        }

            const user = new User({
              name,
              email,
              password,
              blogs:[],      
            })
            
        try{
            await  user.save();
        }catch(err){
            console.log(err);
        }
        console.log('signup successfull');
        return res.status(201).json({user})
    }catch(err){
        console.log(err);
    }
}

const login = async(req,res,next)=>{
    const {email,password}=req.body;
    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(e){
        return res.status(500).json({message: e.toString()});
    }
        if(!existingUser){
            console.log("not found");
            return res.status(404).json({message:"user not found"});
        }
        else{
            console.log('user found');
        }
    const isPass = bcrypt.compare(password, existingUser.password);
    if (!isPass) {
       
      return res.status(401).json({ message: 'Invalid Password' });
    }
    else{
        
    return res.status(200).json('login successfull')
    }
    
}

module.exports = { getAllUser ,signup,login};