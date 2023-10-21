import path from "node:path";
import { Router } from "express";

const router = Router();
export const products = [];

router.post("/product", (req, res) => {
  console.log(req.body);
  products.push({ title: req.body.title });

  res.redirect("/");
});

router.get("/add-product", (req, res) => {
  res.render("add-product.pug");
});

export default router;
