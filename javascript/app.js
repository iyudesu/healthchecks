// Node.js health check example using Express
const express = require('express');
const fs = require('fs');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello, this is code from Node.js!');
});

function isFileExists(filePath) {
  return fs.existsSync(filePath);
}

app.get('/health/readiness', (req, res) => {
  if (isFileExists('/tmp/ready')) {
    // res.sendStatus(200);
    res.send('200 OK, it\'s ready!');
  } else {
    // res.sendStatus(500);
    res.send('503 service unavailable, it\'s not ready!');
  }
});

app.get('/health/liveness', (req, res) => {
  if (isFileExists('/tmp/ready')) {
    // res.sendStatus(200);
    res.send('200 OK, it lives!');
  } else {
    // res.sendStatus(500);
    res.send('503 service unavailable, it doesn\'t live!');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
