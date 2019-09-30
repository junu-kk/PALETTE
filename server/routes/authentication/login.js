//router for login
var express = require('express');
var router = express.Router();
var passport = require('passport');

//for login procedure

router.post('/', passport.authenticate('local-login',(req,res)=>console.log(res)));

/*
router.post('/', passport.authenticate('local-login',{
  //successRedirect:'/',
  failureRedirect:'/login',
  failureFlash:true,
}), (req,res)=>{
  console.log(req.user.is_new);
  res.send(req.user.is_new);
});
*/
module.exports = router;