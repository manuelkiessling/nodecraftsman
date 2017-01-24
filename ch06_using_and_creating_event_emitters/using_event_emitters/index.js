'use strict';

var fs = require('fs');

var stream = fs.createReadStream('./file.txt');

var content = '';

stream.on('error', function(err) {
  console.log('Sad panda: ' + err);
});

stream.on('data', function(data) {
  content = content + data;
});

stream.on('end', function() {
  console.log('File content has been retrieved: ' + content);
});
