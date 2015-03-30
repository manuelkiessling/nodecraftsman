'use strict';

var Server = require('./server.js').Server;

var server = Server('8080');

server.listen(function() {
  console.log('Server started and listening on port', server.options.port);
});