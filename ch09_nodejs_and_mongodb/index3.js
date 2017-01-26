'use strict';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect(
  'mongodb://mongo:27017/accounting',
  function (err, connection) {
    var collection = connection.collection('customers');
    
    var doFind = function (callback) {
      collection.find({
          'n': /^#1/
        },
        {
          'limit': 5,
          'skip' : 2,
          'sort' : [ ['v', 'asc'], ['n', 'desc'] ]
        }).toArray(function (err, documents) {
        console.dir(documents);
        callback();
      });
    };
    
    var doInsert = function (i) {
      if (i < 20) {
        var value = Math.floor(Math.random() * 10);
        collection.insert(
          {'n': '#' + i, 'v': value},
          function (err, count) {
            doInsert(i + 1);
          });
      } else {
        console.log();
        console.log('Inserted', i, 'documents:');
        doFind(function () {
          doUpdate();
        });
      }
    };
    
    var doUpdate = function () {
      collection.update(
        {'v': {'$gt': 5}},
        {'$set': {'valuable': true}},
        {'multi': true},
        function (err, count) {
          console.log();
          console.log('Updated', count, 'documents:');
          doFind(function () {
            collection.remove({}, function () {
              connection.close();
            });
          });
        });
    };
    
    doInsert(0);
    
  });
