var User = require('../models/user');
var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

router.route('/')
    .get(function(req,res) {
        res.json({ message: 'Welcome to the coolest API on Earth!' });
    });

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
                    /*var token = jwt.sign(user, app.get('superSecret') , {
                        expiresInMinutes: 1440 // Expires in 24 hours
                    });*/
                    var token = jwt.sign(user, app.get('secret'));

                    res.json({ success: true, message: 'Enjoy the token!' });
                }
            }
        });
    });

router.route('/users')
    .get(function(req,res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    });

module.exports = router;
