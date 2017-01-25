'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: '',
  database: 'node'
});

connection.query(
  'SELECT id, content FROM test',
  function (err, results, fields) {
    if (err) {
      console.log('A database error occured!');
    } else {
      console.log(results);
    }
    connection.end();
  }
);
