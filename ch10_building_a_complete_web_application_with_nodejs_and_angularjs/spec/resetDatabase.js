'use strict';

var async = require('async');
var env = require('../src/backend/env');
var dbOptions = require('../database.json')[env];

var resetDatabase = function (dbSession, callback) {

  if (dbOptions.driver === 'sqlite3') {

    async.series(
      [

        function (callback) {
          dbSession.remove('keyword', '1', function (err) {
            callback(err)
          });
        },

        function (callback) {
          dbSession.remove('category', '1', function (err) {
            callback(err)
          });
        },

        function (callback) {
          dbSession.remove('sqlite_sequence', '1', function (err) {
            callback(err, null);
          });
        }

      ],

      function (err, results) {
        callback(err);
      }
    );

  }

  if (dbOptions.driver === 'mysql') {

    async.series(
      [

        function (callback) {
          dbSession.query('TRUNCATE keyword', [], function (err) {
            callback(err)
          });
        },

        function (callback) {
          dbSession.query('TRUNCATE category', [], function (err) {
            callback(err)
          });
        }

      ],

      function (err, results) {
        callback(err);
      }
    );

  }

};

module.exports = resetDatabase;