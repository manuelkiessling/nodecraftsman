'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'mysql',
  user: 'root',
  password: ''
});

connection.query('USE node', function(err) {
  if (err) {
    console.log('Could not switch to database "node".');
  }
});

connection.query('CREATE TABLE passwords ' +
  '(id INT(11) AUTO_INCREMENT, ' +
  ' password VARCHAR(255), ' +
  ' PRIMARY KEY(id))',
  function(err) {
    if (err) {
      console.log('Could not create table "passwords".');
    }
  }
);

connection.query('INSERT INTO passwords (password) VALUES ("secret")');
connection.query('INSERT INTO passwords (password) VALUES ("dont_tell")');

connection.end();
