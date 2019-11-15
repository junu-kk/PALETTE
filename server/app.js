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
var multer = require('multer');

//for cors
var cors = require('cors');

//routers
var applicationRouter = require('./newroutes/application');
var certificateRouter = require('./newroutes/certificate');
var clubRouter = require('./newroutes/club');
var eventRouter = require('./newroutes/event');
var joinRouter = require('./newroutes/join');
var noticeRouter = require('./newroutes/notice');
var portfolioRouter = require('./newroutes/portfolio');
var schoolRouter = require('./newroutes/school');
var userRouter = require('./newroutes/user');
var loginRouter = require('./newroutes/login');
var indexRouter = require('./newroutes/index');
var signupRouter = require('./newroutes/signup');
var logoutRouter = require('./newroutes/logout');

var app = express();

app.use(cors());

library.passport();
library.database();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//for img
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use('/image',express.static('./upload'));

app.use(session({secret:'@$!#!D1!@#%!(^)$@#', resave:true, saveUninitialized:true, cookie:{secure:false}}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/application', applicationRouter);
app.use('/certificate', certificateRouter);
app.use('/club', clubRouter);
app.use('/event', eventRouter);
app.use('/join', joinRouter);
app.use('/notice', noticeRouter);
app.use('/portfolio', portfolioRouter);
app.use('/school', schoolRouter);
app.use('/user', passport.authenticate('jwt', {session:false}), userRouter);
app.use('/login', loginRouter);
app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/logout', logoutRouter);

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
