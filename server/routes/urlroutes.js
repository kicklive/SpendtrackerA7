var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
});



router.get('/*', function(req, res, next) {
    //res.send('Express RESTful APIxx');
    console.log('req====>' + req);
    res.redirect('/');
});





module.exports = router;