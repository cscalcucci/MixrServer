var User = require('../models/user');
var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
var config = require('../config');

router.route('/auth')
    .post(function(req,res) {
        User.findOne({
            name: req.body.name
        }, function(err,user) {
            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                if (user.password != req.body.password) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {
                    var tempUser = { userName: user.userName, admin: user.admin };
                    var token = jwt.sign(tempUser, config.secret, {
                        expiresInMinutes: 1440 // Expires in 24 hours
                    });

                    res.json({ success: true, message: 'Enjoy the token!', token: token });
                }
            }
        });
    });

router.use(function(req,res,next) {
    // Check header, url params, or post params for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        //Verifies secret and checks exp
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) {
                if (err.name == "TokenExpiredError") {
                    return res.status(400).json({ error: "Token Expired" });
                } else if (err.name == "JsonWebTokenError") {
                    return res.status(401).json({ error: "Invalid Token" });
                } else {
                    return res.json({ success: false, message: 'Failed to authenticate token.' });
                }
            } else {
                //Save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        // If there is no token, return an error
        return res.status(403).send( { success: false, message: 'No token provded.' });
    }
});

router.route('/')
    .get(function(req,res) {
        res.json({ message: 'Welcome to the coolest API on Earth!' });
    });

// Send x-access-token through header with token value, or /api/users?token=ENTERTOKENHERE
router.route('/users')
    .get(function(req,res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    });

module.exports = router;
