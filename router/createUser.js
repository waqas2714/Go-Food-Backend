const express = require("express");
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/createUser',async(req,res)=>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    try {
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            location: req.body.location
        })
        res.status(200).json(user);
    } catch (err) {
        res.json({message : err.message, success : false});
    }
    

})

router.post('/loginUser',async(req,res)=>{
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
           return res.status(404).json({message : "Please provide valid credentials."})
        }
        const pwdCompare = await bcrypt.compare(password, user.password);
        if (!pwdCompare) {
           return res.status(404).json({message : "Please provide valid password."})   
        }
        const Data = {
            user:{
                id: user._id
            }
        }
        const authToken = jwt.sign(Data,process.env.SECRET)
        return res.status(200).json({success : true, authToken});
    } catch (err) {
         res.json({success : false});
    }
    

})

module.exports = router;