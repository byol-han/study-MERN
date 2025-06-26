var createError = require('http-errors');
var express = require('express');
const passport = require('passport');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('hbs');
var githubStrategy = require('passport-github2').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var Book = require('./models/book'); // Import the book model
var User = require('./models/user');

var app = express();

const LocalStrategy = require('passport-local').Strategy;

// Load environment variables from .env file “.env ← filename” const mongoose = require('mongoose');
require('dotenv').config();

// Import Mongoose for MongoDB connection
const mongoose = require('mongoose');
const { title } = require('process');

// MongoDB URI from .env file
const uri = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

/* creating book lists 
function saveBook(title, author) {
  const newBook = new Book({
    title: title,
    author: author,
    pages: 180,
  });

  newBook
    .save()
    .then((book) => console.log('New book added:', book))
    .catch((error) => console.error('Error:', error));
}
saveBook('The Great Gatsby123', 'F. Scott Fitzgerald');

function findBooks(foundByTitle) {
  Book.find({ title: foundByTitle })
    .then((book) => console.log('Books found:', book))
    .catch((error) => console.error('Error:', error));
}

// findBooks('The Great Gatsby');

function updateBook(oldTitle, newTitle, newAuthor) {
  Book.updateOne({ title: oldTitle }, { title: newTitle, author: newAuthor })
    .then((book) => console.log('Book updated:', book))
    .catch((error) => console.log('Error:', error));
}
// updateBook('The Great Gatsby', 'The Greaterrrrrr', 'Byol');

function deleteBook(deleteByTitle) {
  Book.deleteOne({ title: deleteByTitle })
    .then((book) => console.log('Book deleted:', book))
    .catch((error) => console.log('Error:', error));
}
deleteBook('The Greate Gatsby');
*/

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

// 세션 기반 로그인 상태 유지
app.use(
  session({
    secret: 'yourSessionSecret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new githubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // Attempt to find an existing user with the GitHub profile ID
      const user = await User.findOne({ oauthId: profile.id });
      if (user) {
        return done(null, user);
      } else {
        // If user does not exist, create a new one
        const newUser = new User({
          username: profile.username,
          oauthId: profile.id,
          oauthProvider: 'Github',
          created: Date.now(),
        });
        const savedUser = await newUser.save();
        return done(null, savedUser);
      }
    }
  )
);

passport.authenticate('local');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
app.use('/register', registerRouter);
app.use('/login', loginRouter);

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
