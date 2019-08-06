var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.get('/', function(req,res,next){
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  return res.render('first_login/basic');
});

router.post('/', function(req,res,next){
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  User.findOneAndUpdate({email:req.user.email}, {
    dob:req.body.dob,
    address:req.body.address,
    bio:req.body.bio,
    grade:req.body.grade,
    class:req.body.class,
    work_exp:req.body.work_exp,
    fun_facts:req.body.fun_facts,
    s_i:req.body.s_i,
  }, function(err,updateUser){
    if(err) throw err;
    updateUser.saveUser();
  });
    return res.redirect('/first_login/pfolio');
});

router.get('/pfolio', function(req,res,next){
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  return res.render('first_login/pfolio');
});

router.get('/smc', function(req,res,next){
  if(req.isUnauthenticated()){
    return res.redirect('/login');
  }
  return res.render('first_login/smc');
});

module.exports = router;