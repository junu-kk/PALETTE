var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req,res,next){
  return res.render('authentication/signup');
});

router.post('/', passport.authenticate('local-signup',{
  successRedirect:'/',
  failureRedirect:'/login',
}));

module.exports = router;