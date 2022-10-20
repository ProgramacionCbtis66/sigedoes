"use strict";

var express = require('express');

var jwt = require('jsonwebtoken');

var router = express.Router();

var ccn = require('../connection/connection');

router.post('/login', function (req, res) {
  var _req$body = req.body,
      nombre = _req$body.nombre,
      pass = _req$body.pass;
  console.log(req.body);
  ccn.query('select id_usr, nombre,  status from usuario where nombre = ? and pass = ?', [nombre, pass], function (err, rows, fields) {
    if (!err) {
      if (rows.length > 0) {
        var datos = JSON.stringify(rows[0]);
        var token = jwt.sign(datos, 'stil');
        res.json({
          token: token
        });
      } else {
        res.json({
          Error: "Usuario y contraseña incorrecta"
        });
      }
    } else {
      res.json({
        Error: "Usuario y contraseña incorrecta"
      });
    }
  });
});

function VerificarToken(req, res, next) {
  if (!req.headers.authorization) return res.status(401).json('No authorization');
  var token = req.headers.authorization.substr(7); //console.log(token);

  if (token !== '') {
    var conent = jwt.verify(token, 'stil');
    req.data = conent;
    console.log(req.data);
    next();
  } else {
    res.status(401).json('Token Vacio');
  }
}

module.exports = router;