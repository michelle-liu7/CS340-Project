const express = require('express');
const router = express.Router();

//GET AUTHOR
router.get('/', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "SELECT authorID, fname, lname FROM Authors";
  mysql.pool.query(sql, function(err, results){
    if(err){
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
      res.status(400).end();
    }
    res.status(202).end();
  });
});

// DELETE AUTHOR
router.delete('/', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "DELETE FROM Books_Authors WHERE aid=?";
  var inserts = [req.body.id];
  mysql.pool.query(sql, inserts, function(err, results){
    if(err){
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
      res.status(400).end();
    }
  });
  sql = "DELETE FROM Authors WHERE authorID=?";
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
