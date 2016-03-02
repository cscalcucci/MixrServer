var Juice = require('../models/juice');
var express = require('express');
var router = express.Router();

router.route('/juices')
    .get(function(req,res) {
        Juice.find(function(err,juices) {
            if (err) {
                return res.send(err);
            }

            res.json(juices);
        });
    })
    .post(function(req,res) {
        var juice = new Juice(req.body);

        juice.save(function(err) {
            if (err) {
                return res.send(err);
            }

            res.send({ message: 'Juice Added' });
        });
    });
router.route('/juices/:id')
    .get(function(req,res) {
        Juice.findOne({ _id: req.params.id}, function(err, juice) {
            if (err) {
                return res.send(err);
            }

            res.json(juice);
        });
    })
    .put(function(req,res) {
        Juice.findOne({ _id: req.params.id }, function(err, juice) {
            if (err) {
                return res.send(err);
            }

            for (var property in req.body) {
                juice[property] = req.body[property];
            }

            //save the module
            juice.save(function(err) {
                if (err) {
                    return res.send(err);
                }

                res.json({ message: 'Juice Updated!' });
            });
        });
    })
    .delete(function(req,res) {
        Juice.remove({ _id: req.params.id }, function(err, juice) {
            if (err) {
                return res.send(err);
            }

            res.json({ message: 'Juice Deleted'});
        });
    });

module.exports = router;
