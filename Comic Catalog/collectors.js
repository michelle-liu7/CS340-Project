const express = require('express');
const router = express.Router();
const db = require('./dbcon.js');

//GET COLLECTORS
router.get('/', (req, res) => {
  db.getConnection(function(err, connection){
    sql = "SELECT userID, fname, lname, birthdate FROM Collectors";
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

//DELETE COLLECTOR
router.delete('/', (req, res) => {
  db.getConnection(function(err, connection){
    sql = "DELETE FROM Collectors WHERE userID=?";
    params = [req.body.userID];
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
      else{
        res.status(200).json({message: 'Success! Deleted collector'});
      }
    });
    connection.release();
  });
});

module.exports = router;
