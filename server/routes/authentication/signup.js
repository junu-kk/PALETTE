//router for signup
var express = require('express');
var router = express.Router();
var passport = require('passport');

//for signup procedure
router.post('/', passport.authenticate('local-signup',{
  failureRedirect:'/signup',
  failureFlash:true,
  successRedirect:'/',
}));

module.exports = router;