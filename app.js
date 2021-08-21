const http = require('http');
const url = require('url');
const queryString = require('query-string');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

// business rule
const server = http.createServer((req, res) => {
  var reply;
  const urlParse = url.parse(req.url, true);

  // - receive user info
  const params = queryString.parse(urlParse.search);

  // CREATE user:
  if (urlParse.pathname == '/create-user') {
    // - save user info
    fs.appendFile(
      'users/' + params.id + '.txt',
      JSON.stringify(params),
      function (err) {
        if (err) throw err;
      }
    );
    reply = 'user created';
    res.statusCode = 201;
    res.setHeader('Content-Type', 'text/plain');
    res.end(reply);
  }

  // READ user
  else if (urlParse.pathname == '/get-user') {
    // - show user info
    fs.readFile('users/' + params.id + '.txt', function (err, data) {
      if (err) throw err;
      reply = data;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(reply);
    });
  }

  // UPDATE user
  else if (urlParse.pathname == '/update-user') {
    // - modify user info
    fs.writeFile(
      'users/' + params.id + '.txt',
      JSON.stringify(params),
      function (err) {
        if (err) throw err;
      }
    );
    reply = 'user updated';
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(reply);
  }
  // DELETE user
  else if (urlParse.pathname == '/delete-user') {
    fs.unlink('users/' + params.id + '.txt', function (err) {
      reply = err ? 'user not found' : 'user deleted';
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(reply);
    });
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
