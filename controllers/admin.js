import { Product } from "../models/product.js";

export function getAddProduct(req, res) {
  res.render("admin/add-product.pug", {
    path: req.originalUrl,
    pageTitle: "Add Product",
  });
}

export function postProduct(req, res) {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const userId = req.user._id;

  const product = new Product(
    title,
    imageUrl,
    price,
    description,
    null,
    userId,
  );

  product
    .save()
    .then((result) => {
      // console.log(result);
      console.log("Product has been created!");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      res.redirect("/admin/products");
    });
}

export function putProduct(req, res) {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const id = req.body.id;

  const product = new Product(title, imageUrl, price, description, id);
  product
    .save()
    .then((result) => {
      console.log("Updated product!");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      res.redirect("/admin/products");
    });
}

export function deleteProduct(req, res) {
  const id = req.body.id;

  Product.deleteById(id)
    .then(() => {
      console.log("Product deleted!");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      res.redirect("/admin/products");
    });
}

export function getProducts(req, res) {
  Product.fetchAll()
    .then((products) => {
      res.render("admin/products.pug", {
        products: products,
        path: req.originalUrl,
        pageTitle: "Admin Products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getEditProduct(req, res) {
  const id = req.params.id;
  Product.fetchById(id)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }

      res.render("admin/edit-product.pug", {
        product: product,
        path: req.originalUrl,
        pageTitle: "Edit Product",
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
