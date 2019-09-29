//Main code file for running PALETTE Web Application
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var session = require('express-session');
var library = {
  passport: require('./library/passport'),
  database: require('./library/database'),
};
var flash = require('connect-flash');

//for img
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//routers
var loginRouter = require('./routes/authentication/login'),
logoutRouter = require('./routes/authentication/logout'),
signupRouter = require('./routes/authentication/signup');
var first_loginRouter = require('./routes/first_login');
var excRouter = require('./routes/exc');
var schoolRouter = require('./routes/school');
var clubRouter = require('./routes/club');
var pfolioRouter = require('./routes/pfolio');
var mypageRouter = require('./routes/mypage');
var adminRouter = require('./routes/admin');

var app = express();

library.passport();
library.database();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//for img
app.use(methodOverride('_method'));
app.use(bodyParser.json());

app.use(session({secret:'@$!#!D1!@#%!(^)$@#', resave:true, saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/signup', signupRouter);
app.use('/first_login', first_loginRouter);
app.use('/exc', excRouter);
app.use('/school', schoolRouter);
app.use('/club', clubRouter);
app.use('/pfolio', pfolioRouter);
app.use('/mypage', mypageRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
