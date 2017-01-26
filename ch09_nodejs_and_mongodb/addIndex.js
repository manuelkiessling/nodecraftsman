'use strict';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(
  'mongodb://mongo:27017/accounting',
  function (err, connection) {
    var collection = connection.collection('customers');
    
    collection.ensureIndex('v', function(err, indexName) {
      connection.close();
    });
    
  }
);
