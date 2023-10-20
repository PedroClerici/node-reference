import express from "express";
import bodyParser from "body-parser";

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";

const app = express();
const port = 8000;

app.use("/", bodyParser.urlencoded({ extended: false }));

app.use("/", (req, res, next) => {
  console.log("This always runs!");
  next();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.listen(port);
