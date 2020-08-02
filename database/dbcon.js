var mysql = require('mysql');
var express = require('express');
var app = express();

var pool = mysql.createPool({
  connectionLimit: 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_coppan',
  password        : '3877',
  database        : 'cs340_coppan'
});

module.exports = pool;
