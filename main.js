import path from "node:path";

import express from "express";
import bodyParser from "body-parser";

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

const app = express();
const port = 8000;

// Serving static files
app.use(express.static(path.join(path.resolve(), "public")));
app.use("/", bodyParser.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "views", "404.html"));
});

app.listen(port);
