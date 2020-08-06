module.exports = function(){
  var express = require('express');
  var router = express.Router();

  //getGenres function to get all publishers
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

  // GET genres
  router.get('/', (req, res) => {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["deleteGenre.js"];
    context.title = "View Genres";

    var mysql = req.app.get('mysql');
    getGenres(res, mysql, context, complete);

    function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.render('genres', context);
      }
    }
  });

  // DELETE a genre
  router.delete('/:id', (req, res) => {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Genres WHERE genreID=?";
    var inserts = [req.params.id];

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