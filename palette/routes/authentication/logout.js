var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/', function(req,res,next){
  req.logout();
  return res.redirect('/');
});

module.exports = router;