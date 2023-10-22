import { Product } from "../models/product.js";

export function getAddProducts(req, res) {
  res.render("admin/add-product.pug", {
    path: req.originalUrl,
    pageTitle: "Add Product",
  });
}

export function postAddProducts(req, res) {
  // Create a array with the response body values
  // and use it to instantiate a new product by passing
  // the array as parameters.
  const bodyValues = Object.values(req.body);
  new Product(...bodyValues).save();

  res.redirect("/");
}

export function getProducts(req, res) {
  Product.fetchAll((products) => {
    res.render("admin/products.pug", {
      products: products,
      path: req.originalUrl,
      pageTitle: "Admin Products",
    });
  });
}
