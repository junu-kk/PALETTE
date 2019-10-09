var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/', (req,res,next)=>{
  res.send('working');
});

router.get('/user', (req,res,next)=>{
  if(req.isUnauthenticated()){
    res.json(0,"not logged in");
  } else{
    User.findOne({email:req.user.email},(err,user)=>{
      if(err) throw err;
      res.json(1,user);
    })
  }
})

module.exports=router;