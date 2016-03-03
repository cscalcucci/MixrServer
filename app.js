// =======================
// Packages ==============
// =======================
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var morgan     = require('morgan');
var juices     = require('./routes/juices'); //routes defined here
var users      = require('./routes/users'); //routes defined here
var bson       = require('bson');
var app        = express();

var jwt = require('jsonwebtoken');
var config = require('./config');

// =======================
// MongoDB Config ========
// =======================
var url = '127.0.0.1:27017/' + process.env.OPENSHIFT_APP_NAME;

// If OPENSHIFT env variables are present, use the available connection info:
if (process.env.OPENSHIFT_MONGODB_DB_URL) {
    url = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME;
}

// Connect to mongodb
var connect = function () {
    mongoose.connect(url);
};
connect();

var db = mongoose.connection;

db.on('error', function(error){
    console.log("Error loading the db - "+ error);
});

db.on('disconnected', connect);

// =======================
// Config ================
// =======================
app.set('secret', config.secret); // Secret variable
app.use(bodyParser.json()); // Configure Body-Parser
app.use(bodyParser.urlencoded()); // Configure Body-Parser
app.use(morgan('dev')); // Use morgan to log requests to the console

// =======================
// Routes ================
// =======================
app.use('/api', juices);
app.use('/api', users);
// This is our router middleware
// Path /api passed as first argument to map route middleware to /api
// API URLs become /api/movies and api/movies/:id

module.exports = app;
