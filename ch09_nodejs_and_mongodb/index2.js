'use strict';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(
  'mongodb://mongo:27017/accounting',
  function(err, connection) {
    var collection = connection.collection('customers');
    
    collection.update({}, {'$set': {'age': 24}}, {'multi': true}, function(err, count) {
      
      console.log('Updated', count, 'documents');
      
      collection.find().toArray(function(err, documents) {
        console.dir(documents);
        connection.close();
      });
      
    });
    
  });
