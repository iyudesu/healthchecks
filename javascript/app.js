// Node.js health check example using Express
const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello, this is code from Node.js!');
});

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

app.get('/health/readiness', (req, res) => {
  if (fileExists('/tmp/ready')) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

app.get('/health/liveness', (req, res) => {
  if (fileExists('/tmp/ready')) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
