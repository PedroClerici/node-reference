import path from "node:path";

import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import { get404 } from "./controllers/error.js";
import { mongoConnect } from "./utils/database.js";
import { User } from "./models/user.js";

const app = express();
const port = 8000;

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.static(path.join(path.resolve(), "public")));
app.use("/", bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use((req, res, next) => {
  User.fetchById("656e50f4ba60fd89bc04a5fe")
    .then((user) => {
      req.user = new User(user.username, user.email, user.cart, user._id);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      next();
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

mongoConnect(() => {
  app.listen(port);
});
