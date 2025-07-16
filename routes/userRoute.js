const express=require('express');
const router=express.Router();

const User=require('../models/user')
const {jwtAuthMiddleware,generateToken}=require('../jwt');
router.post('/register',async(req,res)=>{

    try{
        const data=req.body;
        const newUser=new User(data);
        const response=await newUser.save();
        console.log('data saved');
        res.status(200).json({response:response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await User.findOne({email:email});
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error:'invalid email or password'});
        }
        
        const payload={
            id:user.id,
        }
        const token=generateToken(payload);
        res.json({token:token});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})

module.exports=router;