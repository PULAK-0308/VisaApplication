const express=require('express');
const router=express.Router();
const VisaApplication = require("../models/VisaApplication");
const {jwtAuthMiddleware}=require('../jwt');

router.post('/',jwtAuthMiddleware,async(req,res)=>{

    const { country } = req.body;
    const app = await VisaApplication.create({ userId:req.user.id, country });
    res.status(201).json(app);
})

router.get('/',jwtAuthMiddleware,async(req,res)=>{

    const applications = await VisaApplication.find({ userId: req.user.id });
    res.json(applications);

    
})

module.exports=router;