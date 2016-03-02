var app = require('../app'); //Require our app

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

function initIPAdress() {
    var adr = process.env.OPENSHIFT_NODEJS_IP;

    if (typeof adr === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using localhost');
            adr = 'localhost';
    }

    server_ip_address = adr;
}

initIPAdress();

app.listen(server_port, server_ip_address, function() {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});


//app.set('port', process.env.PORT || 8000);
/*
var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
}); */
