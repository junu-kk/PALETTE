//router for signup
var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');

//for signup procedure
//router.post('/', passport.authenticate('local-signup',(req,res)=>console.log(res)));


router.post('/', (req, res) => {
  passport.authenticate('local-signup', {session:false}, (err,user) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Sign Up Failed',
        user   : user
      });
    }
    const token = jwt.sign(user.toJSON(), 'testsecret');
    return res.json({user,token});
  })(req, res);
});

module.exports = router;
