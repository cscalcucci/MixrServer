var User = require('../models/user');
var express = require('express');
var router = express.Router();

router.route('/')
    .get(function(req,res) {
        res.json({ message: 'Welcome to the coolest API on Earth!' });
    });

router.route('/setup')
    .get(function(req,res) {

        var chris = new User({
            name: 'Chris Scalcucci',
            password: 'password',
            admin: true
        });

        chris.save(function(err) {
            if (err) throw err;

            console.log('User saved successfully');
            res.json({ success: true });
        });
    });

router.route('/users')
    .get(function(req,res) {
        User.find({}, function(err, users) {
            res.json(users);
        });
    });

module.exports = router;
