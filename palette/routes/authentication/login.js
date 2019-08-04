var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req,res,next){
  return res.render('authentication/login');
});

router.post('/', passport.authenticate('local-login',{
  failureRedirect:'/login',
}), function(req,res){
  return res.redirect('/');
});

module.exports = router;