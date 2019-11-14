//code for authentication by using passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../newModels/User_new');

var passportJWT = require('passport-jwt');
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;


module.exports = function(){
  passport.serializeUser(function(user,done){
    done(null,user);
  });

  passport.deserializeUser(function(user,done){
    done(null,user);
  });

  passport.use('local-login',new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true,

  }, function(req,email,password,done){
    User.findOne({email:email}, function(err,user){
      if(err){//펑션오류
        return done(err);
      }
      if(!user){//이멜틀림
        return done(null,false,{
          message:'Incorrect Email.'
        });
      }
      if(!user.passwordCheck(password)){//비번틀림
        return done(null,false,{
          message:'Incorrect Password.'
        });
      }
      return done(null,user, {message: 'Logged In Successfully.'});//성공
    });
  }));

  passport.use('local-signup', new LocalStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true,
  }, function(req,email,password,done){
    User.findOne({email:email},function(err,user){
      if(err){//펑션오류
        return done(err);
      }
      if(user){//이메일이미존재
        return done(null,false,{
          message:'Email already exists.'
        });
      } else{//성공
        var newUser = new User();

        newUser.isStudent = req.body.isStudent;
        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.introduce = req.body.introduce;
        newUser.fun_facts = req.body.fun_facts;
        newUser.palette = req.body.palette;
        newUser.dob = req.body.dob;
        newUser.s_i = req.body.s_i;
        newUser.photo = req.body.photo;
        newUser.school = req.body.school;
        newUser.club = req.body.club;
        newUser.subscribedCompetitions = req.body.subscribedCompetitions;
        newUser.subscribedEvents = req.body.subscribedEvents;

        newUser.saveUser((err)=>{
          if(err) console.log(err);
          else return done(null, newUser);
        });
      }
    });
  }));

  passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'testsecret'
      },
      function (jwtPayload, done) {
        return User.findOne({email:jwtPayload.email})
            .then(user => {
              return done(null, user);
            })
            .catch(err => {
              return done(err);
            });
      }
  ));
};