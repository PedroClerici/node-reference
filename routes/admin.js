import path from "node:path";
import { Router } from "express";

const router = Router();

router.post("/product", (req, res) => {
  console.log(req.body);

  res.redirect("/");
});

router.get("/add-product", (req, res) => {
  res.sendFile(path.join(path.resolve(), "views", "add-product.html"));
});

export default router;
