//쓰이는건지 잘 몰라서 일단 냅둡니다!
//router for login
var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
//for login procedure

// router.post('/', passport.authenticate('local-login'), (req,res)=>console.log(res));


router.post('/', function (req, res) {
  passport.authenticate('local-login', {session: false}, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user   : user
      });
    }
    req.login(user, {session: false}, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user.toJSON(), 'testsecret');
      return res.json({user, token});
    });
  })(req, res);
});

router.post('/',passport.authenticate('local-login',));

module.exports = router;