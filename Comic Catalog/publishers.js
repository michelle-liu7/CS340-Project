const express = require('express');
const router = express.Router();
const db = require('./dbcon.js');

//GET PUBLISHERS
router.get('/', (req, res) => {
  db.getConnection(function(err, connection){
    sql = "SELECT pubID, name FROM Publishers";
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

//DELTE PUBLISHER
router.delete('/', (req, res) => {
  db.getConnection(function(err, connection){
    sql = "DELETE FROM Publishers WHERE pubID=?";
    params = [req.body.pubID];
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
      else{
        res.status(200).json({message: 'Success! Deleted publisher'});
      }
    });
    connection.release();
  });
});

module.exports = router;
