module.exports = function(){
  var express = require('express');
  var router = express.Router();

  //getBooks function to return all books
  function getBooks(res, mysql, context, complete){
    var sql = "SELECT b.bookID AS id, b.title AS title, b.issue AS issue, " +
    "GROUP_CONCAT(DISTINCT CONCAT(a.fname, ' ', a.lname) ORDER BY a.fname SEPARATOR ', ') AS author, " +
    "p.name AS publisher, GROUP_CONCAT(DISTINCT g.type ORDER BY g.type SEPARATOR ', ') AS genre, " +
    "b.price AS price, b.upc AS upc, CONCAT(c.fname, ' ', c.lname) AS owner FROM Books b " +
    "LEFT JOIN Books_Authors ba ON b.bookID = ba.bid " +
    "LEFT JOIN Authors a ON ba.aid = a.authorID " +
    "LEFT JOIN Publishers p ON b.publisher = p.pubID " +
    "LEFT JOIN Books_Genres bg ON b.bookID = bg.bid " +
    "LEFT JOIN Genres g ON bg.gid = g.genreID " +
    "LEFT JOIN Collectors c ON b.owner = c.userID " +
    "GROUP BY b.upc ORDER BY b.title";

    mysql.pool.query(sql, function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.books = results;
        complete();
    });
  }

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

  //getBook function to return info about a specific book
  function getBook(res, mysql, context, id,complete){
    var sql = "SELECT b.bookID AS id, b.title AS title, b.issue AS issue, GROUP_CONCAT(DISTINCT a.authorID ORDER BY a.authorID SEPARATOR ',') AS authorIDs," +
    "p.pubID AS publisherID, GROUP_CONCAT(DISTINCT g.genreID ORDER BY g.genreID SEPARATOR ',') AS genreIDs," +
    "b.price AS price, b.upc AS upc, c.userID AS ownerID FROM Books b " +
    "LEFT JOIN Books_Authors ba ON b.bookID = ba.bid " +
    "LEFT JOIN Authors a ON ba.aid = a.authorID " +
    "LEFT JOIN Publishers p ON b.publisher = p.pubID " +
    "LEFT JOIN Books_Genres bg ON b.bookID = bg.bid " +
    "LEFT JOIN Genres g ON bg.gid = g.genreID " +
    "LEFT JOIN Collectors c ON b.owner = c.userID " +
    "WHERE b.bookID = ? " +
    "GROUP BY b.upc ORDER BY b.title";
    var inserts = [id]

    mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.book = results[0];
      complete();
    });
  }

  //get authorIDs for update
  function getAuthorIDsForUpdate(res, mysql, context, id,complete){
    var sql = "SELECT aid FROM `Books_Authors` WHERE bid = ?";
    var inserts = [id]
    mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.AIds = results;
      console.log(context.AIds);
      complete();
    });
  }

  //get genreIDs for update
  function getGenreIDsForUpdate(res, mysql, context, id,complete){
    var sql = "SELECT gid FROM `Books_Genres` WHERE bid = ?";
    var inserts = [id]
    mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.GIds = results;
      console.log(context.GIds);
      complete();
    });
  }

  function getInventoryByGenre(req,res, mysql, context, complete){
    var sql = "SELECT b.bookID AS id, b.title AS title, b.issue AS issue, " +
    "GROUP_CONCAT(DISTINCT CONCAT(a.fname, ' ', a.lname) ORDER BY a.fname SEPARATOR ', ') AS author, " +
    "p.name AS publisher, GROUP_CONCAT(DISTINCT g.type ORDER BY g.type SEPARATOR ', ') AS genre, " +
    "b.price AS price, b.upc AS upc, CONCAT(c.fname, ' ', c.lname) AS owner FROM Books b " +
    "LEFT JOIN Books_Authors ba ON b.bookID = ba.bid " +
    "LEFT JOIN Authors a ON ba.aid = a.authorID " +
    "LEFT JOIN Publishers p ON b.publisher = p.pubID " +
    "LEFT JOIN Books_Genres bg ON b.bookID = bg.bid " +
    "LEFT JOIN Genres g ON bg.gid = g.genreID " +
    "LEFT JOIN Collectors c ON b.owner = c.userID " +
    "WHERE g.genreID = ?" +
    "GROUP BY b.upc ORDER BY b.title";
    var inserts = [req.params.id]

    mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
          res.write(JSON.stringify(error));
          res.end();
      }
      context.books = results;
      complete();
    });
  }

  //update all of the fields that aren't M:M relationships
  function updateBook(req, res, mysql){
    var sql = "UPDATE Books SET title=?, issue=?, upc=?, publisher=?, price=?, owner=? WHERE bookID=?";
    var inserts = [req.body.title, req.body.issue, req.body.upc, req.body.publisher, req.body.price, req.body.owner, req.params.id];
    console.log(inserts)
    sql = mysql.pool.query(sql,inserts,function(error, results, fields){
      if(error){
        console.log(error);
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      }else{
        updateBooksGenres(req, res, mysql);
        updateBooksAuthors(req, res, mysql);
      }
    });
  }

  //update the Books_Authors table
  function updateBooksAuthors(req, res, mysql){
    var sql = "DELETE FROM Books_Authors WHERE bid=?";
    var inserts = [req.params.id];
    mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        console.log(error);
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      }else{
        sql = "INSERT INTO Books_Authors (bid, aid) VALUES (?,?)";
        var authors = req.body.authors;
        var x;
        if(!Array.isArray(authors)){
          inserts = [req.params.id, authors];
          mysql.pool.query(sql, inserts, function(err, rows){
            if(err){
              console.log(JSON.stringify(err));
              res.write(JSON.stringify(err));
              res.status(400).end();
            }
          });
        }else{
          for(x=0; x<authors.length; x++){
            inserts = [req.params.id, authors[x]];
            mysql.pool.query(sql, inserts, function(error, results, fields){
              if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
              }
            });
          }
        }
      }
    });
  }

  //update the Books_Genres table
  function updateBooksGenres(req, res, mysql){
    var sql = "DELETE FROM Books_Genres WHERE bid=?";
    var inserts = [req.params.id];
    mysql.pool.query(sql, inserts, function(error, results, fields){
      if(error){
        console.log(error);
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      }else{
        sql = "INSERT INTO Books_Genres (bid, gid) VALUES (?,?)";
        var genres = req.body.genres;
        var x;
        if(!Array.isArray(genres)){
          inserts = [req.params.id, genres];
          mysql.pool.query(sql, inserts, function(err, rows){
            if(err){
              console.log(JSON.stringify(err));
              res.write(JSON.stringify(err));
              res.status(400).end();
            }
          });
        }else{
          for(x=0; x<genres.length; x++){
            inserts = [req.params.id, genres[x]];
            mysql.pool.query(sql, inserts, function(error, results, fields){
              if(error){
                console.log(error);
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
              }
            });
          }
        }
      }
    });
  }

  // GET INVENTORY
  router.get('/', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["filterByGenre.js", "deleteInventory.js"];
    context.title = "View Inventory";

    var mysql = req.app.get('mysql');
    getBooks(res, mysql, context, complete);
    getGenres(res, mysql, context, complete);

    function complete(){
      callbackCount++;
      if(callbackCount >= 2){
          res.render('inventory', context);
      }
    }
  });

  // DELETE BOOK
  router.delete('/:id', function(req, res) {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Books_Authors WHERE bid=?";
    var inserts = [req.params.id];

    mysql.pool.query(sql, inserts, function(error, results, fields){
        if (error){
          console.log(error);
          res.write(JSON.stringify(error));
          res.status(400);
          res.end();
        }else{
          sql = "DELETE FROM Books_Genres WHERE bid=?";
          mysql.pool.query(sql, inserts, function(error, results, fields){
            if (error){
              console.log(error);
              res.write(JSON.stringify(error));
              res.status(400);
              res.end();
            }else{
              sql = "DELETE FROM Books WHERE bookID=?";
              mysql.pool.query(sql, inserts, function(error, results, fields){
                if (error){
                  console.log(error);
                  res.write(JSON.stringify(error));
                  res.status(400);
                  res.end();
                } else{
                  res.status(202).end();
                }
              });
            }
          });
        }
    });
  });

  // display the chosen book info on the update_book page
  router.get('/:id', function(req, res){
    callbackCount = 0;
    var context = {};
    context.title = "Update a Book";
    context.jsscripts = ["selectedGenres.js", "selectedAuthors.js", "selectedPublisher.js", "selectedOwner.js", "updateBook.js"];
    var mysql = req.app.get('mysql');
    getBook(res, mysql, context, req.params.id, complete);
    getGenres(res, mysql, context, complete);
    getPublishers(res, mysql, context, complete);
    getAuthors(res, mysql, context, complete);
    getOwners(res, mysql, context, complete);
    getAuthorIDsForUpdate(res, mysql, context, req.params.id,complete);
    getGenreIDsForUpdate(res, mysql, context, req.params.id,complete);

    function complete(){
        callbackCount++;
        if(callbackCount >= 7){
          res.render('update_book', context);
        }
    }
  });

  // update a book
  router.put('/:id', function(req, res){
    var mysql = req.app.get('mysql');
    console.log(req.body)
    console.log(req.params.id)
    var sql = "SELECT COUNT(*) AS count FROM Books WHERE upc=? AND bookID !=?";
    var inserts = [req.body.upc, req.params.id];
    mysql.pool.query(sql, inserts, function(error, results, fields){
      if (error){
        console.log(error);
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      }
      else{
        if(results[0].count == 0){
          updateBook(req, res, mysql);
          res.status(202).end();
        }
        else{
          res.status(409).end();
        }
      }
    });
  });

  //FILTER BY GENRE
  router.get('/genre/:id', function(req, res) {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["filterByGenre.js", "deleteInventory.js"];
    context.title = "View Inventory";
    var mysql = req.app.get('mysql');

    getInventoryByGenre(req,res, mysql, context, complete);
    getGenres(res, mysql, context, complete);

    function complete(){
      callbackCount++;
      if(callbackCount >= 2){
          res.render('inventory', context);
      }
    }
  });

  return router;
}();
