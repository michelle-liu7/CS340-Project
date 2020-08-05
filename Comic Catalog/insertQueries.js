const express = require('express');
const router = express.Router();

//ADD GENRE
router.post('/add_genre.html', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "INSERT INTO Genres (type) VALUES (?)";
  var inserts = [req.body.type];
  mysql.pool.query(sql, inserts, function(err, rows){
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

//ADD PUBLISHER
router.post('/add_publisher.html', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "INSERT INTO Publishers (name) VALUES (?)";
  var inserts = [req.body.name];
  mysql.pool.query(sql, inserts, function(err, rows){
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

//ADD COLLECTOR
router.post('/add_collector.html', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "INSERT INTO Collectors (fname, lname, birthdate) VALUES (?,?,?)";
  var inserts = [req.body.fname, req.body.lname, req.body.birthdate];
  mysql.pool.query(sql, inserts, function(err, rows){
    if(err){
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
      res.status(400).end();
    }
    else{
      res.status(200).end();
    }
  });
});

//ADD AUTHOR
router.post('/add_author.html', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "INSERT INTO Authors (fname, lname) VALUES (?,?)";
  var inserts = [req.body.fname, req.body.lname];
  mysql.pool.query(sql, inserts, function(err, rows){
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

//ADD BOOK
function insertBooksAuthors(req, res, id, mysql){
  var sql = "INSERT INTO Books_Authors (bid, aid) VALUES (?,?)";
  var authors = req.body.authors;
  var x;
  for(x=0; x<genres.length; x++){
    inserts = [id, authors[x]];
    mysql.pool.query(sql, inserts, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
        res.status(400).end();
      }
    });
  }
}

function insertBooksGenres(req, res, id, mysql){
  var sql = "INSERT INTO Books_Genres (bid, gid) VALUES (?,?)";
  var genres = req.body.genres;
  var x;
  for(x=0; x<genres.length; x++){
    inserts = [id, genres[x]];
    mysql.pool.query(sql, inserts, function(err, rows){
      if(err){
        console.log(JSON.stringify(err));
        res.write(JSON.stringify(err));
        res.status(400).end();
      }
    });
  }
}

router.post('/add_book.html', function(req, res){
  var mysql = req.app.get('mysql');
  var sql = "INSERT INTO Books (owner, title, issue, upc, publisher, price) VALUES(?,?,?,?,?,?)";
  var inserts = [req.body.collector, req.body.title, req.body.issue, req.body.upc, req.body.publisher, req.body.price];
  mysql.pool.query(sql, inserts, function(err, rows){
    if(err){
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
      res.status(400).end();
    }
  });

  sql = "SELECT bookID FROM Books WHERE upc=?";
  inserts = [req.body.upc];
  mysql.pool.query(sql, inserts, function(err, rows){
    if(err){
      console.log(JSON.stringify(err));
      res.write(JSON.stringify(err));
      res.status(400).end();
    }
    else{
      var id = [rows[0].id];
      insertBooksAuthors(req, res, id, mysql);
      insertBooksGenres(req, res, id, mysql);
      res.status(202).end();
    }
  });
});

module.exports = router;
