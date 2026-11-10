
const http = require('http');

const PORT = 3000;
const VERSION = '1.0';

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });

  res.end(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Andina Market</title>
    </head>
    <body>
      <h1>Andina Market</h1>
      <h2>Version ${VERSION}</h2>
      <p>Desplegado en AWS EC2</p>
    </body>
    </html>
  `);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Andina Market ${VERSION} - Puerto ${PORT}`);
});
