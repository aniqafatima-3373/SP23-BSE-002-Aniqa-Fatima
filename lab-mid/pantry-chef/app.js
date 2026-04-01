var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session'); // 1. Session library add karein

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const mongoose = require('mongoose');

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/pantryDB')
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.log('Connection Error:', err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 2. Session Configuration (Bohut zaroori hai authentication ke liye)
app.use(session({
    secret: 'pantry-chef-secret-key-123', // Isse secret rakhein
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 ghante tak login rahega
}));

// 3. Global Variables (Taake EJS files mein 'user' ka data nazar aa sake)
app.use(function(req, res, next) {
    res.locals.user = req.session.user || null; // Agar login hai toh user, warna null
    next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;