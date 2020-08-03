const express = require('express');
const router = express.Router();
const db = require('../database/dbcon.js');

//ADD GENRE
router.post('/add_genre.html', (req, res) => {
  db.getConnection(function(err, connection){
    sql = "INSERT INTO Genres (type) VALUES (?)";
    params = [req.body.type];
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
      else{
        res.status(200).json({message: "Success! Added genre"});
      }
    });
    connection.release();
  });
});

//ADD PUBLISHER
router.post('/add_publisher.html', (req, res) => {
  db.getConnection(function(err, connection){
    sql = "INSERT INTO Publishers (name) VALUES (?)";
    params = [req.body.name];
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
      else{
        res.status(200).json({message: 'Success! Added publisher'});
      }
    });
    connection.release();
  });
});

//ADD COLLECTOR
router.post('/add_collector.html', (req, res, next) => {
  db.getConnection(function(err, connection){
    sql = "INSERT INTO Collectors (fname, lname, birthdate) VALUES (?,?,?)";
    params = [req.body.fname, req.body.lname, req.body.birthdate];
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
      else{
        res.status(200).json({message: 'Success! Added collector'});
      }
    });
    connection.release();
  });
});

//ADD AUTHOR
router.post('/add_author.html', (req, res) => {
  db.getConnection(function(err, connection){
    sql = "INSERT INTO Authors (fname, lname) VALUES (?,?)";
    params = [req.body.fname, req.body.lname];
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
      else{
        res.status(200).json({message: "Success! Added author"});
      }
    });
    connection.release();
  });
});

//ADD BOOK
router.post('/add_book.html', (req, res) =>{
  db.getConnection(function(err, connection){
    sql = "INSERT INTO Books (owner, title, issue, upc, publisher, price) VALUES(?,?,?,?,?,?)";
    params = [req.body.userID, req.body.title, req.body.issue, req.body.upc, req.body.pubID, req.body.price];
    connection.query(sql, params, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
    });
    sql = "SELECT bookID FROM Books WHERE upc=?";
    param = [req.body.upc];
    connection.query(sql, param, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
      }
      else{
        bookID = [rows[0].bookID];
        sql = "INSERT INTO Books_Authors (bid, aid) VALUES (?,?)";
        params = [bookID, req.body.authorID];
        connection.query(sql, params, function(err, rows){
          if(err){
            console.log(JSON.stringify(err));
            res.write(JSON.stringify(err));
          }
        });
        sql = "INSERT INTO Books_Genres (bid, gid) VALUES (?,?)";
        params = [bookID, req.body.genreID];
        connection.query(sql, params, function(err, rows){
          if(err){
            console.log(JSON.stringify(err));
            res.write(JSON.stringify(err));
          }
          else{
            res.status(200).json({message: "success"});
          }
        });
      }
    });
    connection.release();
  });
});

module.exports = router;
