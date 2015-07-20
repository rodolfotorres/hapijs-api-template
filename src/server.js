'use strict';

//Hapi modules
var Hapi = require('hapi'),
  Good = require('good'),
  pack = require('../package'),
  swaggerOptions = {
    apiVersion: pack.version
  },

  server = new Hapi.Server({
    connections: {
      routes: {
        cors: true
      }
    }
  });

server.connection({
  port: 8000
});


//Controllers
var helloRoute = require('./controllers/hello-route');

server.route(helloRoute);

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
}, function(err) {
  if (err) {
    throw err; // something bad happened loading the plugin
  }

  server.start(function() {
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});

server.register({
  register: require('hapi-swagger'),
  options: swaggerOptions
}, function(err) {
  if (err) {
    server.log(['error'], 'hapi-swagger load error: ' + err);
  } else {
    server.log(['start'], 'hapi-swagger interface loaded');
  }
});
