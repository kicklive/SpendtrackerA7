var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require("express-session");
var cors = require('cors');
var cookieParser = require('cookie-parser');

module.exports = function(app, config) {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(logger('dev'));
    app.use(
        session({
            secret: "STA7",
            resave: false,
            saveUninitialized: false
        })
    );
    app.use(cors());

    //this tells express that anytime a request come into the public directory that 
    //matches to a file in the public directory, go ahead and server up that file
    // console.log("ex==>" + config.rootPath + '/client/dist');
    app.use(express.static(config.rootPath + 'client/dist/client'));

};