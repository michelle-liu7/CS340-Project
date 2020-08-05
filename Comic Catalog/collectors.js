module.exports = function(){
  var express = require('express');
  var router = express.Router();

  //getOwners function to get all authors
  function getOwners(res, mysql, context, complete){
    
    mysql.pool.query("SELECT userID AS id, fname, lname, birthdate AS dob FROM Collectors", function(error, results, fields){
        if(error){
          res.write(JSON.stringify(error));
          res.end();
        }
        context.owners = results;
        complete();
    });  
  }

  // GET collectors
  router.get('/', (req, res) => {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["deleteCollector.js"];
    context.title = "View Collectors";

    var mysql = req.app.get('mysql');
    getOwners(res, mysql, context, complete);

    function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.render('collectors', context);
      }
    }
  });

  // DELETE a collector
  router.delete('/:id', (req, res) => {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Collectors WHERE userID=?";
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