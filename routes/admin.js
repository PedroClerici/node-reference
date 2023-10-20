import { Router } from "express";

const router = Router();

router.post("/product", (req, res) => {
  console.log(req.body);

  res.redirect("/");
});

router.get("/add-product", (req, res) => {
  res.send(`
    <form action="/product" method="post">
      <input type="text" name="name" />
      <button type="submit">Add Product</button>
    </form>
  `);
});

export default router;
