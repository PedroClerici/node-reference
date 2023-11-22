import { Product } from "../models/product.js";

export function getAddProduct(req, res) {
  res.render("admin/add-product.pug", {
    path: req.originalUrl,
    pageTitle: "Add Product",
  });
}

export function postProduct(req, res) {
  // Create a array with the response body values
  // and use it to instantiate a new product by passing
  // the array as parameters.
  const bodyValues = Object.values(req.body);
  new Product(...bodyValues)
    .save()
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });

  res.redirect("/");
}

export function putProduct(req, res) {
  const product = req.body;
  Product.update(product)
    .then(() => {})
    .catch((err) => console.log(err));

  res.redirect("/");
}

export function deleteProduct(req, res) {
  const productId = req.body.id;
  console.log(req.body);
  Product.delete(productId);

  res.redirect("/");
}

export function getProducts(req, res) {
  Product.fetchAll()
    .then(({ rows }) => {
      res.render("admin/products.pug", {
        products: rows,
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
    .then(({ rows }) => {
      const product = rows[0];

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
