const express = require('express');
const router = express.Router();

//GET GENRE
router.get('/', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "SELECT genreID, type FROM Genres";
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

//DELTE GENRE
router.delete('/', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "DELETE FROM Books_Genres WHERE gid=?";
  var inserts = [req.body.id];
  mysql.pool.query(sql, inserts, function(err, results){
    if(err){
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
      res.status(400).end();
    }
  });
  sql = "DELETE FROM Genres WHERE genreID=?";
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
