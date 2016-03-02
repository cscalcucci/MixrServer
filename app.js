var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var juices     = require('./routes/juices'); //routes defined here
var bson       = require('bson');
var app        = express();

//var dbName = 'mixrDB';
//var connectionString = 'mongodb://localhost:27017/' + dbName;
//mongoose.connect(connectionString);
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

// Configure Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/api', juices);
// This is our router middleware
// Path /api passed as first argument to map route middleware to /api
// API URLs become /api/movies and api/movies/:id

module.exports = app;
