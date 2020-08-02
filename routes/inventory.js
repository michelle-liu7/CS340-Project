const express = require('express');
const router = express.Router();
const db = require('../database/dbcon.js');

// GET INVENTORY
router.get('/', (req, res) => {
  db.getConnection(function(err, connection){
    sql = "SELECT b.bookID, b.title AS Title, b.issue AS Issue, " +
          "GROUP_CONCAT(DISTINCT CONCAT(a.fname, ' ', a.lname) ORDER BY a.fname SEPARATOR ', ') AS Author, " +
          "p.name AS Publisher, GROUP_CONCAT(DISTINCT g.type ORDER BY g.type SEPARATOR ', ') AS Genres, " +
          "b.price AS Price, b.upc AS UPC, CONCAT(c.fname, ' ', c.lname) AS Owner FROM Books b " +
          "LEFT JOIN Books_Authors ba ON b.bookID = ba.bid " +
          "LEFT JOIN Authors a ON ba.aid = a.authorID " +
          "LEFT JOIN Publishers p ON b.publisher = p.pubID " +
          "LEFT JOIN Books_Genres bg ON b.bookID = bg.bid " +
          "LEFT JOIN Genres g ON bg.gid = g.genreID " +
          "LEFT JOIN Collectors c ON b.owner = c.userID " +
          "GROUP BY b.upc ORDER BY b.title";
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

// DELETE BOOK
router.delete('/', (req, res) => {
  db.getConnection(function(err, connection){
    sql = "DELETE FROM Books_Authors WHERE bid=?";
    params = [req.body.bookID];
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
    });
    sql = "DELETE FROM Books_Genres WHERE bid=?";
    params = [req.body.bookID];
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
    });
    sql = "DELETE FROM Books WHERE bookID=?";
    params = [req.body.bookID];
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
      else{
        res.status(200).json({message: "Success! Deleted book"});
      }
    });
    connection.release();
  });
});

//UPDATE BOOK
router.put('/', (req, res) => {
  db.getConnection(function(err, connection){
    sql = "UPDATE Books SET title=?, issue=?, upc=?, publisher=?, price=?, owner=? WHERE bookID=?";
    params = [req.body.title, req.body.issue, req.body.upc, req.body.pubID, req.body.price, req.body.userID, req.body.bookID];
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
    });
    sql = "UPDATE Books_Authors SET aid=? WHERE bid=?";
    params = [req.body.authorID, req.body.bookID];
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
    });
    sql = "UPDATE Books_Genres SET gid=? WHERE bid=?";
    params = [req.body.genreID, req.body.bookID];
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
      else{
        res.status(200).json({message: "Success! Updated book"});
      }
    });
    connection.release();
  });
});

//FILTER BY GENRE
router.get('/genre=:genreID', (req, res) => {
  db.getConnection(function(err, connection) {
    sql = "SELECT b.bookID, b.title AS Title, b.issue AS Issue, " +
          "GROUP_CONCAT(DISTINCT CONCAT(a.fname, ' ', a.lname) ORDER BY a.fname SEPARATOR ', ') AS Author, " +
          "p.name AS Publisher, GROUP_CONCAT(DISTINCT g.type ORDER BY g.type SEPARATOR ', ') AS Genres, " +
          "b.price AS Price, b.upc AS UPC, CONCAT(c.fname, ' ', c.lname) AS Owner FROM Books b " +
          "LEFT JOIN Books_Genres bg ON b.bookID = bg.bid " +
          "JOIN Genres g ON bg.gid = g.genreID AND g.genreID = ?" +
          "LEFT JOIN Books_Authors ba ON b.bookID = ba.bid " +
          "LEFT JOIN Authors a ON ba.aid = a.authorID " +
          "LEFT JOIN Publishers p ON b.publisher = p.pubID " +
          "LEFT JOIN Collectors c ON b.owner = c.userID " +
          "GROUP BY b.upc ORDER BY b.title";
      params = [req.params.genreID];
    connection.query(sql, params, function(err, rows){
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

module.exports = router;
