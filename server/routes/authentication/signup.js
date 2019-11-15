//router for signup
var express = require('express');
var router = express.Router();
var passport = require('passport');

//for signup procedure
//router.post('/', passport.authenticate('local-signup',(req,res)=>console.log(res)));

router.post('/', function(req,res,next) {
    passport.authenticate('local-login', {session: false}, (err, user) => {
        if(err || !user) {
            return res.status(400).json({
                message: 'Sign Up Failed'
            });
        }
        else return res.status(201).json(user)
    })
});

module.exports = router;