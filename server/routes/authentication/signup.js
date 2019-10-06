//router for signup
var express = require('express');
var router = express.Router();
var passport = require('passport');

//for signup procedure
//router.post('/', passport.authenticate('local-signup',(req,res)=>console.log(res)));

router.post('/', passport.authenticate('local-signup',{
  failureRedirect:'/login',
  failureFlash:true,
}),(req,res)=>{
  var fmsg=req.flash();
  var feedback='';
  if(fmsg.error){
    feedback=fmsg.error[0];
    res.json(0,feedback);
  } else{
    res.json(1);
  }
});

module.exports = router;