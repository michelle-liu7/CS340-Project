const express = require('express');
const router = express.Router();
const db = require('./dbcon.js');

//GET AUTHOR
router.get('/', (req, res) => {
  db.getConnection(function(err, connection){
    sql = "SELECT authorID, fname, lname FROM Authors";
    connection.query(sql, function(err, rows){
      res.status(200).json(rows);
    });
    connection.release();
  });
});

// DELETE AUTHOR
router.delete('/', (req, res) => {
  db.getConnection(function(err, connection){
    sql = "DELETE FROM Books_Authors WHERE aid=?";
    params = [req.body.authorID];
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
      else{
        res.status(200);
      }
    });
    sql = "DELETE FROM Authors WHERE authorID=?";
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
      else{
        res.status(200).json({message: "Success! Deleted author"});
      }
    });
    connection.release();
  });
});

module.exports = router;
