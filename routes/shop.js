import path from "node:path";
import { Router } from "express";

import { products as adminProducts } from "./admin.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("shop.pug", {
    products: adminProducts,
    path: req.originalUrl,
    pageTitle: "Shop",
  });
});

export default router;
