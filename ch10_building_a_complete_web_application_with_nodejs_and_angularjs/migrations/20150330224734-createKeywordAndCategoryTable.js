'use strict';

var dbm = require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function(db, callback) {
  async.series(
    [

      db.createTable.bind(db, 'keyword', {
        id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true },
        value: { type: 'string', length: '128', notNull: true, unique: true },
        categoryID: { type: 'int', notNull: true }
      }),

      db.createTable.bind(db, 'category', {
        id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true },
        name: { type: 'string', length: '128', notNull: true }
      })

    ], callback);
};

exports.down = function(db, callback) {
  async.series(
    [
      db.dropTable.bind(db, 'keyword'),
      db.dropTable.bind(db, 'category')
    ], callback);
};