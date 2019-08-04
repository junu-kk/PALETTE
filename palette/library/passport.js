var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');

module.exports = function(){
  passport.serializeUser(function(user,done){
    done(null,user);
  });

  passport.deserializeUser(function(user,done){
    done(null,user);
  });

  passport.use('local-login',new LocalStrategy({
    usernameField:'email',
    passwordField:'pw',
    passReqToCallback:true,

  }, function(req,email,pw,done){
    User.findOne({email:email}, function(err,user){
      if(err){
        return done(err);
      }
      if(!user){
        return done(null,false);
      }
      if(!user.pwCheck(pw)){
        return done(null,false);
      }
      return done(null,user);
    });
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField:'email',
    passwordField:'pw',
    passReqToCallback:true,
  }, function(req,email,pw,done){
    User.findOne({email:email},function(err,user){
      if(err){
        return done(err);
      }
      if(user){
        return done(null,false);
      } else{
        var newUser = new User();

        newUser.fname = req.body.fname;
        newUser.lname = req.body.lname;
        newUser.email = email;
        newUser.pw = pw;

        newUser.save(function(err){
          if(err){
            console.log(err);
          } else{
            return done(null, newUser);
          }
        });
      }
    })
  }));
}