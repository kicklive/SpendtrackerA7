import passport from 'passport'
import mongoose from 'mongoose'
import { isBuffer } from 'util';
let User = mongoose.model('User')

module.exports.register = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    if (email != '' && named != '') {
        let user = new User();
        user.name = name
        user.email = email;

        user.setPassword(password);

        user.save((err) => {
            if (err) {
                res.status(404).json(err);
            } else {
                var token;
                token = user.generateJWT();
                res.status(200);
                res.json({
                    "token": token
                });
            }
        });
    } else {
        res.status(404).json({ 'msg': 'Please complete all fields' });
    }
}
module.exports.login = (req, res) => {
    passport.authenticate('local', (err, user, info) => {
        var token;

        //if passpor thows/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        //if user is found
        if (user) {
            token = user.generateJWT();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            //If user is not found'
            res.status(400).json(info);
        }
    })(req, res);
}