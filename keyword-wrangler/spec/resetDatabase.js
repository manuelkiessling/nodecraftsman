'use strict'

let async = require('async')
let env = require('../src/backend/env')
let dbOptions = require('../database.json')[env]

let resetDatabase = function (dbSession, callback) {
  if (dbOptions.driver === 'sqlite3') {
    async.series(
      [
        function (callback) {
          dbSession.remove('keyword', '1', function (err, res) {
            callback(err)
          })
        },
        function (callback) {
          dbSession.remove('category', '1', function (err, res) {
            callback(err)
          })
        },
        function (callback) {
          dbSession.remove('sqlite_sequence', '1', function (err, res) {
            callback(err)
          })
        }
      ],
        function (err, results) {
          callback(err)
        }
    )
  }

  if (dbOptions.driver === 'mysql') {
    async.series(
      [
        function (callback) {
          dbSession.query('TRUNCATE keyword', [], function (err, res) {
            callback(err)
          })
        },
        function (callback) {
          dbSession.query('TRUNCATE category', [], function (err, res) {
            callback(err)
          })
        }
      ],
      function (err, results) {
        callback(err)
      }
    )
  }
}

module.exports = resetDatabase
