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
  failureRedirect:'/login',
  failureFlash:true,
}), function(req,res){
  console.log("로그인성공");
  return res.redirect('/');
});

module.exports = router;