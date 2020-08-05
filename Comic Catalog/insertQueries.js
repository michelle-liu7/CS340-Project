module.exports = function(){
  var express = require('express');
  var router = express.Router();
  

  //getGenres function to get all genres
  function getGenres(res, mysql, context, complete){
    
    mysql.pool.query("SELECT genreID AS id, type FROM Genres", function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.genres = results;
        complete();
    });  
  }

  //getAuthors function to get all authors
  function getAuthors(res, mysql, context, complete){
    
    mysql.pool.query("SELECT authorID AS id, CONCAT(fname, ' ', lname) AS fullName FROM Authors", function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.authors = results;
        complete();
    });  
  }

  //getPublishers function to get all publishers
  function getPublishers(res, mysql, context, complete){
    
    mysql.pool.query("SELECT pubID AS id, name FROM Publishers", function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.publishers = results;
        complete();
    });  
  }

  //getOwners function to get all owners
  function getOwners(res, mysql, context, complete){
    
    mysql.pool.query("SELECT userID AS id, CONCAT(fname, ' ', lname) AS fullName FROM Collectors", function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.owners = results;
        complete();
    });  
  }


  //render add_book page
  router.get('/add_book', function(req, res){
    var callbackCount = 0;
    var context = {};
    var mysql = req.app.get('mysql');
    context.title = "Add a book";
    
    getGenres(res, mysql, context, complete);
    getPublishers(res, mysql, context, complete);
    getAuthors(res, mysql, context, complete);
    getOwners(res, mysql, context, complete);

    function complete(){
      callbackCount++;
      if(callbackCount >= 4){
          res.render('add_book', context);
      }
    }

  });

  //add a book to database
  router.post('/add_book', (req, res) =>{
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Books (owner, title, issue, upc, publisher, price) VALUES(?,?,?,?,?,?)";
    var inserts = [req.body.owner, req.body.title, req.body.issue, req.body.upc, req.body.publisher, req.body.price];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if (error){
        console.log(error);
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      } 
    });

    sql = "SELECT bookID FROM Books WHERE upc=?";
    inserts = [req.body.upc];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if (error){
        console.log(error);
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      } else{
        bookID = [results[0].bookID];
        sql = "INSERT INTO Books_Authors (bid, aid) VALUES (?,?)";
        inserts = [bookID, req.body.authors];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
          if (error){
            console.log(error);
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
          } 
        });

        sql = "INSERT INTO Books_Genres (bid, gid) VALUES (?,?)";
        inserts = [bookID, req.body.genres];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
          if (error){
            console.log(error);
            res.write(JSON.stringify(error));
            res.status(400);
            res.end();
          } else{
            res.status(202);
            res.redirect('/inventory');
          }
        });
      }

    });
  });

  //render add_author page
  router.get('/add_author', function(req, res){
    var context = {};
    context.title = "Add an author";

    res.render('add_author', context);

  });

  //add an author to database
  router.post('/add_author', (req, res) =>{
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Authors (fname, lname) VALUES (?,?)";
    var inserts = [req.body.fname, req.body.lname];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if (error){
        console.log(error);
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      } else {
        res.status(202);
        res.redirect('/authors');
      }
    });

  });

  //render add_publisher page
  router.get('/add_publisher', function(req, res){
    var context = {};
    context.title = "Add a publisher";

    res.render('add_publisher', context);

  });

  //add a publisher to database
  router.post('/add_publisher', (req, res) =>{
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Publishers (name) VALUES (?)";
    var inserts = [req.body.name];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if (error){
        console.log(error);
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      } else {
        res.status(202);
        res.redirect('/publishers');
      }
    });

  });

  //render add_genre page
  router.get('/add_genre', function(req, res){
    var context = {};
    context.title = "Add a genre";
  
    res.render('add_genre', context);
  
  });
  
  //add a genre to database
  router.post('/add_genre', (req, res) =>{
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Genres (type) VALUES (?)";
    var inserts = [req.body.type];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if (error){
        console.log(error);
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      } else {
        res.status(202);
        res.redirect('/genres');
      }
    });
  
  });

  //render add_collector page
  router.get('/add_collector', function(req, res){
    var context = {};
    context.title = "Add a collector";
  
    res.render('add_collector', context);
  
  });
  
  //add a collector to database
  router.post('/add_collector', (req, res) =>{
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO Collectors (fname, lname, birthdate) VALUES (?,?,?)";
    var inserts = [req.body.fname, req.body.lname, req.body.dob];
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if (error){
        console.log(error);
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      } else {
        res.status(202);
        res.redirect('/collectors');
      }
    });

  });

      

  return router;
}();