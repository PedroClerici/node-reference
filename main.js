import express from "express";

const app = express();
const port = 8000;

app.use((req, res) => {
  res.send("<h1>Hello, world!</h1>");
});

app.listen(port);
