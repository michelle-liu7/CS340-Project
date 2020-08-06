var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/authors', require('./authors.js'));
app.use('/collectors', require('./collectors.js'));
app.use('/genres', require('./genres.js'));
app.use('/insertQueries', require('./insertQueries.js'));
app.use('/inventory', require('./inventory.js'));
app.use('/publishers', require('./publishers.js'));

app.get('/', function(req, res){
    res.render('home', {title:'Comic Catalog'});
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});