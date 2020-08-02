const http = require('http');
const app = require('./main');
const server = http.createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, function(){
  console.log(`\n Running on port ${port}\n`)
});
