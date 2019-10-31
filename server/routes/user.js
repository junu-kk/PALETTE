var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/', (req,res,next)=>{
  if(req.isUnauthenticated()){
    res.status(401).json({status:'not logged in'});
  } else{
    User.findOne({email:req.user.email},(err,user)=>{
      if(err) throw err;
      res.status(200).json(user);
    })
  }
});

module.exports = router;