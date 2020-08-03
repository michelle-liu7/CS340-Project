const express = require('express');
const router = express.Router();
const db = require('../database/dbcon.js');

//GET GENRE
router.get('/', (req, res) => {
  db.getConnection(function(err, connection){
    sql = "SELECT genreID, type FROM Genres";
    connection.query(sql, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
      else{
        res.status(200).json(rows);
      }
    });
    connection.release();
  });
});

//DELTE GENRE
router.delete('/', (req, res) => {
  db.getConnection(function(err, connection){
    sql = "DELETE FROM Books_Genres WHERE gid=?";
    params = [req.body.genreID];
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
    });
    sql = "DELETE FROM Genres WHERE genreID=?";
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
      else{
        res.status(200).json({message: "Success! Deleted genre"});
      }
    });
    connection.release();
  });
});

module.exports = router;
