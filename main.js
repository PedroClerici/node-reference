import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 8000;

app.use("/", bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);

app.use("/", (req, res, next) => {
  console.log("This always runs!");
  next();
});

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

app.listen(port);
