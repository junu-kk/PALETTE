var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/', (req,res,next)=>{
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  User.findOne({email:req.user.email})
  .exec((err,user)=>{
    if(err) throw err;

    
    if(user.admin==false){
      return res.redirect('/main');
    }

    return res.render('admin');
  });
});

module.exports = router;