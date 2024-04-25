// MAIN LOGIC, INITIALIZATION OF THE APP IS DONE HERE
// TO RUN LOCALLY, TYPE "node app.js" IN TERMINAL (W/O THE QUOTATION MARKS)

// Import necessary modules
var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/loginRoute.js');
var cartRouter = require('./routes/cartRoute');
var createAccountRouter = require('./routes/createAccountRoute');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev')); // can remove later
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    cookie: {maxAge: 60000 * 120},
    saveUninitialized: false,
    resave: false
}));




app.use((req, res, next) => {
    if(!req.session.cart)
    {
        req.session.cart = [];
    }
    if(!req.session.user)
    {
        req.session.user = "";
    }
    next();
});



// Set the path to your public directory
const publicDirectory = path.join(__dirname, 'public');

// Serve static files from the public directory
app.use(express.static(publicDirectory));

app.use('/attemptLogin', loginRouter);
app.use('/createAccount', createAccountRouter);

app.use('/', cartRouter);



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



