var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {

    // if(!req.body.name || !req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.role = req.body.role;

    user.setPassword(req.body.password);

    user.save(function(err) {
        var token;
        token = user.generateJwt();
        console.log('token===>' + token);
        res.status(200);
        res.json({
            "token": token
        });
    });

};
module.exports.xxx = function() {};
module.exports.login = function(req, res) {
    console.log("in auth controller");
    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    passport.authenticate('local', function(err, user, info) {
        var token;
        console.log('jlkrjelj');
        // If Passport throws/catches an error
        if (err) {
            console.log('error====>' + err);
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            console.log('found');
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            console.log('not found');
            res.status(401).json;
            res.json({ 'xxx': 'aaa' });
        }
    })(req, res);

};