module.exports = function(){
  var express = require('express');
  var router = express.Router();

  //getAuthors function to get all authors
  function getAuthors(res, mysql, context, complete){
    
    mysql.pool.query("SELECT authorID AS id, fname, lname FROM Authors", function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.authors = results;
        complete();
    });  
  }

  // GET authors
  router.get('/', (req, res) => {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["deleteAuthor.js"];
    context.title = "View Authors";

    var mysql = req.app.get('mysql');
    getAuthors(res, mysql, context, complete);

    function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.render('authors', context);
      }
    }
  });

  // DELETE an author
  router.delete('/:id', (req, res) => {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Books_Authors WHERE aid=?";
    var inserts = [req.params.id];

    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
        if (error){
          console.log(error);
          res.write(JSON.stringify(error));
          res.status(400);
          res.end();
        } 
    });

    sql = "DELETE FROM Authors WHERE authorID=?";
    sql = mysql.pool.query(sql, inserts, function(error, results, fields){
      if (error){
        console.log(error);
        res.write(JSON.stringify(error));
        res.status(400);
        res.end();
      } else {
        res.status(202).end();
      }
    });

  });

  return router;
}();