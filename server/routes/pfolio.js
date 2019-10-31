//router of portfolio
//사진 마치는대로 작업해야함!
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Pfolio = require('../models/Pfolio');

//shows portfolio page
router.get('/', (req,res,next)=>{
  if(req.isUnauthenticated()){
    res.status(401).json({status:'not logged in'});
  } else{
    User.findOne({email:req.user.email},(err,user)=>{
      if(err) throw err;
      Pfolio.findOne({user:user._id}, (err,pfolio)=>{
        if(err) throw err;

        res.status(200).json(pfolio)
      });
    });
  }
});

module.exports = router;
