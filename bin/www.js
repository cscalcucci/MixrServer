var app = require('../app'); //Require our app

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

var server = app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + port );
});


//app.set('port', process.env.PORT || 8000);
/*
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
}); */
