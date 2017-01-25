'use strict';

var request = require('request');
var async = require('async');

var url = 'http://localhost:8080/';

async.series([
  
  function(callback) {
    request.get(url + 'getUserName?id=1234', function(err, res, body) {
      console.log('Name:', JSON.parse(body).value);
      callback(null);
    });
  },
  
  function(callback) {
    request.get(url + 'getUserStatus?id=1234', function(err, res, body) {
      console.log('Status:', JSON.parse(body).value);
      callback(null);
    });
  },
  
  function(callback) {
    request.get(url + 'getUserCountry?id=1234', function(err, res, body) {
      console.log('Country:', JSON.parse(body).value);
      callback(null);
    });
  },
  
  function(callback) {
    request.get(url + 'getUserAge?id=1234', function(err, res, body) {
      console.log('Age:', JSON.parse(body).value);
      callback(null);
    });
  }

]);
