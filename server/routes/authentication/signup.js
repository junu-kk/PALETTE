//router for signup
var express = require('express');
var router = express.Router();
var passport = require('passport');

//for signup procedure
router.post('/', passport.authenticate('local-signup',(req,res)=>console.log(res)));

module.exports = router;