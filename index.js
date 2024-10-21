const http = require('http');
const fs = require('fs');

const PORT = 3000;

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/read' && method === 'GET') {
    fs.readFile('myfile.txt', 'utf8', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error occurred while reading the file');
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    });
  } 
  else if (url === '/add' && method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      fs.writeFile('myfile.txt', body, (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error occurred while creating the file');
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('File successfully created');
      });
    });
  } 
  else if (url === '/edit' && method === 'PUT') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      fs.appendFile('myfile.txt', `\n${body}` , (err) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          return res.end('Error occurred while updating the file');
        }
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Content successfully appended to the file');
      });
    });
  } 
  else if (url === '/delete' && method === 'DELETE') {
    fs.unlink('myfile.txt', (err) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        return res.end('Error occurred while deleting the file');
      }
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('File successfully deleted');
    });
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
