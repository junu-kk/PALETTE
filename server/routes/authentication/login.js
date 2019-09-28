//router for login
var express = require('express');
var router = express.Router();
var passport = require('passport');

//for login page
router.get('/', (req,res,next)=>{
  var fmsg = req.flash();
  var feedback = '';
  if(fmsg.error){
    feedback = fmsg.error[0];
  }
  
  res.send(feedback);
  /*
  return res.render('authentication/login',{
    ct:{
      feedback:feedback,
    }
  });
  */
});

//for login procedure
router.post('/', passport.authenticate('local-login',{
  //successRedirect:'/',
  failureRedirect:'/login',
  failureFlash:true,
}), (req,res)=>{
  console.log(req.user.is_new);
  res.send(req.user.is_new);
  /*
  if(req.user.is_new){
    return res.redirect('/first_login');
  }
  
  return res.redirect('/main');
  */
});

module.exports = router;