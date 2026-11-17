const http = require('http');
const fs = require('fs');
const path = require('path');
const { generateTable } = require('./multiplication');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }

  if (url.pathname === '/api/table') {
    try {
      const rows = generateTable(url.searchParams.get('number'));
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(rows));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: err.message }));
    }
  }

  if (url.pathname === '/' || url.pathname === '/index.html') {
    const html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'));
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end(html);
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Multiplication Table app running on http://localhost:${PORT}`);
});
