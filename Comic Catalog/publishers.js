const express = require('express');
const router = express.Router();

//GET PUBLISHERS
router.get('/', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "SELECT pubID, name FROM Publishers";
  mysql.pool.query(sql, function(err, results){
    if(err){
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
      res.status(400).end();
    }
    else{
      res.status(202).end();
    }
  });
});

//DELTE PUBLISHER
router.delete('/', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "DELETE FROM Publishers WHERE pubID=?";
  var inserts = [req.body.id];
  mysql.pool.query(sql, inserts, function(err, results){
    if(err){
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
      res.status(400).end();
    }
    else{
      res.status(202).end();
    }
  });
});

module.exports = router;
