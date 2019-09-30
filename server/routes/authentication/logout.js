//router for logout
var express = require('express');
var router = express.Router();
var passport = require('passport');

//for logout
router.post('/', (req,res,next)=>{
  req.logout();
});

module.exports = router;