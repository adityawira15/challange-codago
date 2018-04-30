var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
let DataUsers = require('./models/users')
var express = require('express');
var favicon = require('serve-favicon');
let flash = require('connect-flash');
var index = require('./routes/index');
var LocalStrategy = require('passport-local').Strategy;
var logger = require('morgan');
let mongoose = require('mongoose')
var passport = require('passport');
var path = require('path');
let session = require('express-session')
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/cms');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


//express application
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

//passport
app.use(passport.initialize());
app.use(passport.session());
app.use(session({ secret: 'rahasiaadit'}));
app.use(flash())

//router
app.use('/', index);
app.use('/users', users);
require('./config/passport')(passport);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
