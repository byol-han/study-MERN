var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//we are telling node "views" is the directory where your views are stored

app.set('view engine', 'hbs');

app.use(logger('dev'));
// morgan is a logging library that logs HTTP requests to the console
// it is used for debugging and monitoring purposes
// it logs the HTTP method, URL, status code, response time, and other details of each request
// it is a middleware that can be used in Express applications to log requests
// it is used to log HTTP requests in a readable format

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
// express.urlencoded() is a middleware that parses incoming requests with URL-encoded payloads
// it is used to parse URL-encoded data in the request body and make it available in req.body
// URL-encoded data is typically used in HTML forms when the form's method is set to "POST"

app.use(cookieParser());
// cookieParser() is a middleware that parses cookies attached to the client request object
// it is used to parse cookies in the request headers and make them available in req.cookies
// Cookies are small pieces of data that are stored on the client side and sent to the server with each request

app.use(express.static(path.join(__dirname, 'public')));
// express.static() is a middleware that serves static files from a specified directory
// static files are such as images, CSS files, and JavaScript files

// route grouping
app.use('/', indexRouter);
// indexRouter is a router that handles requests to the root URL ("/")

app.use('/users', usersRouter);
// usersRouter is a router that handles requests to the /users URL

app.use('/about', aboutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
  // createError(404) creates a new error object with a status code of 404 (Not Found)
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
