import path from "node:path";
import { Router } from "express";

import { products as adminProducts } from "./admin.js";

const router = Router();

router.get("/", (req, res) => {
  console.log(adminProducts);
  res.render("shop.pug");
});

export default router;
