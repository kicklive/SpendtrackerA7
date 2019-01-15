var express = require('express');
var passport = require('passport');


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var config = require('./server/config/config')[env];
require('./server/config/express')(app, config);
require('./server/config/dbroutes')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/passport');
var routesApi = require('./server/routes/index');
var urlApi = require('./server/routes/urlroutes');


// [SH] Initialise Passport before using the route middleware
app.use(passport.initialize());

// [SH] Use the API routes when path starts with /api
console.log('in app.js');
app.use('/', urlApi);
app.use('/details', urlApi);
//app.use('/api', routesApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({
            "message": err.name + ": " + err.message
        });
    }
});

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

app.listen(config.port);
console.log('Server started. Listning on port ' + config.port);