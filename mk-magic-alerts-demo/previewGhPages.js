const fs = require('fs');
const http = require('http');
const path = require('path');

const port = Number(process.env.PORT ?? 4899);
const baseHref = '/mk-magic-messages-library/';
const previewUrl = `http://localhost:${port}${baseHref}`;
const distPath = path.join(__dirname, 'dist', 'mk-magic-alerts-demo', 'browser');

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  green: '\x1b[32m',
  cyan: '\x1b[96m'
};

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function sendFile(res, filePath) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    res.writeHead(200, {
      'Cache-Control': 'no-store',
      'Content-Type': contentTypes[path.extname(filePath)] ?? 'application/octet-stream'
    });
    res.end(content);
  });
}

http.createServer((req, res) => {
  const requestUrl = new URL(req.url ?? '/', `http://${req.headers.host}`);

  if (requestUrl.pathname === '/') {
    res.writeHead(302, { Location: baseHref });
    res.end();
    return;
  }

  if (!requestUrl.pathname.startsWith(baseHref)) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const requestedPath = decodeURIComponent(requestUrl.pathname.slice(baseHref.length));
  const relativePath = requestedPath === '' ? 'index.html' : requestedPath;
  const filePath = path.normalize(path.join(distPath, relativePath));

  if (!filePath.startsWith(distPath)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (error, stats) => {
    if (!error && stats.isFile()) {
      sendFile(res, filePath);
      return;
    }

    sendFile(res, path.join(distPath, 'index.html'));
  });
}).listen(port, () => {
  console.log('');
  console.log(`${colors.green}->${colors.reset} ${colors.bold}Local:${colors.reset}   ${colors.cyan}${previewUrl}${colors.reset}`);
  console.log('');
});
