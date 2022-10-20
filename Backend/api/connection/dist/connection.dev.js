"use strict";

var mysql = require('mysql2');

var ccn = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1205',
  database: 'pventah'
});
ccn.connect(function (err) {
  if (err) {
    console.log("no connection error: " + err);
  } else {
    console.log("Bd Connect");
  }
});
module.exports = ccn;