//*nodemon* *mongod* *postman* *mongoose* *roboT*


//this is your entry point to your app

var createError = require('http-errors');``

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');


//Mongoose data connects to mongodb database
mongoose.connect('mongodb://localhost/api-users', { useNewUrlParser: true}, (err) => {
  if (err) console.log(`Error: ${err}`);
    else console.log('mongodb connection') 
})



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//if you are at root http://.....com/ level uses index.js
app.use('/', indexRouter);

//if you are at http:/....com/users ** uses users.js
app.use('/users', usersRouter);

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
