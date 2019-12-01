//router of portfolio
//사진 마치는대로 작업해야함!
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Pfolio = require('../models/Pfolio');

//shows portfolio page
router.get('/', (req, res, next)=> {
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  User.findOne({email:req.user.email}).exec((err,user)=>{
    if(err) throw err;

    Pfolio.findOne({user:user._id}).exec((err,pfolio)=>{
      if(err) throw err;
      
      return res.render('pfolio',{ct:{
        pfolio:pfolio,
      }, active: ['pfolio']});
    });
  });
});

module.exports = router;
