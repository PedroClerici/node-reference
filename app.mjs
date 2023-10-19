// const http = require("http");
import http from "node:http";

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(req.url, req.method, req.headers);

  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html>
      <head> </head>
      <body>
        <h1>Hello from my Node.js server!</h1>
      </body>
    </html>
  `);
  res.end();

  // process.exit();
});

server.listen(8000);
