const express = require('express');
const router = express.Router();

//GET COLLECTORS
router.get('/', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "SELECT userID, fname, lname, birthdate FROM Collectors";
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

//DELETE COLLECTOR
router.delete('/', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "DELETE FROM Collectors WHERE userID=?";
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
