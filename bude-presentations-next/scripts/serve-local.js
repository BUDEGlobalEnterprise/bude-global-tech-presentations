const http = require('http');
const fs = require('fs');
const path = require('path');
const handler = require('serve-handler');

const PORT = parseInt(process.env.PORT || '9000', 10);
const HOST = process.env.HOST || '0.0.0.0';
const OUT_DIR = path.join(__dirname, '..', 'out');
const LOG_FILE = path.join(__dirname, '..', 'server.log');

function log(message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}\n`;
  try {
    fs.appendFileSync(LOG_FILE, line);
  } catch (err) {
    // Ignore file write errors
  }
  console.log(line.trim());
}

process.on('uncaughtException', (err) => {
  log(`[UNCAUGHT] ${err.stack || err.message}`);
});

process.on('unhandledRejection', (reason) => {
  log(`[UNHANDLED REJECTION] ${reason}`);
});

process.on('exit', (code) => {
  log(`Process exited with code: ${code}`);
});

process.on('beforeExit', (code) => {
  log(`Process beforeExit with code: ${code}`);
});

// Check if out directory exists
if (!fs.existsSync(OUT_DIR)) {
  log(`[ERROR] Directory '${OUT_DIR}' not found. Please run 'npm run build' first.`);
  process.exit(1);
}

const server = http.createServer((request, response) => {
  return handler(request, response, {
    public: OUT_DIR,
    cleanUrls: true,
    trailingSlash: true,
    headers: [
      {
        source: '**/*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ],
  });
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    log(`[ERROR] Port ${PORT} is already in use. Server is likely already running.`);
  } else {
    log(`[ERROR] Server error: ${err.message}`);
  }
  process.exit(1);
});

server.listen(PORT, HOST, () => {
  log(`BUDE Global Tech Presentations server is running!`);
  log(`Local URL:   http://localhost:${PORT}`);
  log(`Network URL: http://127.0.0.1:${PORT}`);
  log(`Serving:     ${OUT_DIR}`);
});

process.on('SIGTERM', () => {
  log('Received SIGTERM, shutting down...');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  log('Received SIGINT, shutting down...');
  server.close(() => process.exit(0));
});
