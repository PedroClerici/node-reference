// const http = require("http");
import http from "node:http";
import fs from "node:fs";

const server = http.createServer();

server.on("request", (req, res) => {
  console.log(req.url, req.method, req.headers);

  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
        <head> 
          <title>Homepage</title>
        </head>
        <body>
          <h1>Hello from my Node.js server!</h1>
          <form action="/message" method="post">
            <input type="text" name="message" />
            <button type="submit">Submit</button>
          </form>
        </body>
      </html>
    `);

    return res.end();
  }

  if (req.url === "/message" && req.method === "POST") {
    const body = [];
    let messageValue = "";

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);

      messageValue = parsedBody.slice(parsedBody.indexOf("=") + 1);
      console.log(messageValue);
      fs.writeFileSync("message.txt", messageValue);
    });

    res.statusCode = 304;
    res.setHeader("Location", "/");

    return res.end();
  }
});

server.listen(8000);
