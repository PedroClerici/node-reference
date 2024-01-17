import path from "node:path";

import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import mongoose from "mongoose";
import session from "express-session";
import { default as connectMongoDBSession } from "connect-mongodb-session";
const MongoDBStore = connectMongoDBSession(session);

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import authRoutes from "./routes/auth.js";
import { get404 } from "./controllers/error.js";

import User from "./models/user.js";
import user from "./models/user.js";

const MONGODB_URI =
  "mongodb+srv://hotza:CyDL07ln3IcWDfli@cluster0.fim2wqe.mongodb.net/shop?retryWrites=true&w=majority";

const app = express();
const port = 8000;
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.set("view engine", "pug");
app.set("views", "views");

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(express.static(path.join(path.resolve(), "public")));
app.use("/", bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use((req, res, next) => {
  if (!req.session.user) {
    next();
  }

  User.findById(req.session.user._id).then((user) => {
    req.user = user;
    next();
  });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(get404);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          username: "John Doe",
          email: "JhonDoe@example.com",
          cart: {
            items: [],
          },
        });
        user.save();
      }
    });

    app.listen(port);
  })
  .catch((error) => {
    console.log(error);
  });
