module.exports = function(){
  var express = require('express');
  var router = express.Router();

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

  // GET publishers
  router.get('/', (req, res) => {
    var callbackCount = 0;
    var context = {};
    context.jsscripts = ["deletePublisher.js"];
    context.title = "View Publishers";

    var mysql = req.app.get('mysql');
    getPublishers(res, mysql, context, complete);

    function complete(){
      callbackCount++;
      if(callbackCount >= 1){
          res.render('publishers', context);
      }
    }
  });

  // DELETE a publisher
  router.delete('/:id', (req, res) => {
    var mysql = req.app.get('mysql');
    var sql = "DELETE FROM Publishers WHERE pubID=?";
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