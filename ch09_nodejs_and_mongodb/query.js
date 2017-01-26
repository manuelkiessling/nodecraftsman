'use strict';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(
  'mongodb://mongo:27017/accounting',
  function (err, connection) {
    var collection = connection.collection('customers');
    
    collection.find(
      {'v': {'$gt': 5}},
      {
        'skip:': 100000,
        'limit': 10,
        'sort': 'v'
      }
    ).toArray(function (err, documents) {
      console.dir(documents);
      connection.close();
    });
    
  });
