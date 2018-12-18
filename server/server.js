import express from 'express';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';

console.log('hrere');
//bring in the data model

//require('./models/db');
//require('./models/users');

//bring in the Passport config after model is defined
//require('./config/passport');
//require('./models/db');
import y from './config/passport'
import x from './models/db'
import routesApi from './routes/index'

let xx = x;
let app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());
app.use('/server', routesApi);

// error handlers
// Catch unauthorised errors
app.use(function(err, req, res) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({ "message": err.name + ": " + err.message });
    }
});
app.use(
    session({
        secret: "stA7",
        resave: false,
        saveUninitialized: false
    })
);
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;