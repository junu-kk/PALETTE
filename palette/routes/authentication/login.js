var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req,res,next){
  var fmsg = req.flash();
  var feedback = '';
  if(fmsg.error){
    feedback = fmsg.error[0];
  }
  return res.render('authentication/login',{
    ct:{
      feedback:feedback,
    }
  });
});

router.post('/', passport.authenticate('local-login',{
  //successRedirect:'/',
  failureRedirect:'/login',
  failureFlash:true,
}), function(req,res){
  console.log(req.user.is_new);
  if(req.user.is_new){
    return res.redirect('/first_login');
  }
  
  return res.redirect('/main');
});

module.exports = router;