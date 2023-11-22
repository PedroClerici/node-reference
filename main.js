import path from "node:path";

import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import { get404 } from "./controllers/error.js";
import { db } from "./utils/database.js";

const app = express();
const port = 8000;

app.set("view engine", "pug");
app.set("views", "views");

app.use(express.static(path.join(path.resolve(), "public")));
app.use("/", bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

app.listen(port);
