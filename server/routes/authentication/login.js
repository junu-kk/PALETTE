//router for login
var express = require('express');
var router = express.Router();
var passport = require('passport');

//for login procedure

// router.post('/', passport.authenticate('local-login'), (req,res)=>console.log(res));


router.post('/', passport.authenticate('local-login',{
  //successRedirect:'/',
  failureRedirect:'/login',
  failureFlash:true,
}), (req,res)=>{
  var fmsg=req.flash();
  var feedback='';
  if(fmsg.error){
    feedback=fmsg.error[0];
    res.json(0,fmsg);
  } else{
    res.json(1);
  }
});

router.post('/',passport.authenticate('local-login',))

module.exports = router;