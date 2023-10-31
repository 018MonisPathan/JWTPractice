const mongoose = require('mongoose');
const express = require('express');

const router = express.Router(); 
const User = require('../models/User')
const passport = require('passport');
const utility = require('../utility')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res, next) => {
   console.log('Called');
   try {
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);

      const newuser = new User({
         username: req.body.username,
         password: password 
      });

      const user = await newuser.save();
      const jwt = utility.IssueJW_Token(user);
      
      res.json({ success: true, user: user, token: jwt.token, expiresIn: jwt.expires });
      
   } catch (err) {
      next(err);
   }
});

router.post('/login', async (req,res,next)=>{

    User.findOne({username:req.body.username})
   .then((user)=>{
      if(!user){
          res.status(401).json({success:false, msg:"could not find user"})
      }

      const isValid =  bcrypt.compare(req.body.password,user.password)

      
      if(isValid){
          const tokenObject = utility.IssueJW_Token(user)

          res.status(200).json({success:true, user:user, token:tokenObject.token, expiersIn:tokenObject.expires})
          
      }else{
          res.status(200).json({success:false, msg:"you enterd the wrong username or password"})
      }
  })
})

router.get('/authenticateUser',passport.authenticate('jwt',{session:false}), (req, res, next) => {

   res.status(200).json({success:true,msg:"You are authorized !"})
});


router.post('/get',(req,res,next)=>{
   res.send("Hello world")
})
module.exports = router
