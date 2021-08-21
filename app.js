const http = require('http');
const url = require('url');
const queryString = require('query-string');

const hostname = '127.0.0.1';
const port = 3000;

// business rule
const server = http.createServer((req, res) => {
  // retrieve 'question' on url
  const params = queryString.parse(url.parse(req.url, true).search);

  // verifies 'question' and choose 'answer'
  let answer;
  if (params.question == 'meaning-of-life') {
    answer = '42';
  } else if (params.question == 'foo') {
    answer = 'bar';
  } else {
    answer = "don't know";
  }

  // returns chosen answer
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(answer);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
