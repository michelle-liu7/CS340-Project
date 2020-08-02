const express = require('express');
const app = express();
const inventoryRoute = require('./routes/inventory');
const authorRoutes = require('./routes/authors');
const publisherRoutes = require('./routes/publishers');
const genreRoutes = require('./routes/genres');
const collectorRoutes = require('./routes/collectors');
const insertRoute = require('./routes/insertQueries');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes to handle requests
app.use('/inventory.html', inventoryRoute);
app.use('/authors.html', authorRoutes);
app.use('/publishers.html', publisherRoutes);
app.use('/genres.html', genreRoutes);
app.use('/collectors.html', collectorRoutes);
app.use('/', insertRoute);

//error handling for invalid routes
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

//more error handling
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({message: error.message});
});

module.exports = app;
