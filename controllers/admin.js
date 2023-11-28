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

  req.user
    .createProduct({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
    })
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

  req.user
    .getProducts({ where: { id: id } })
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;

      return product.save();
    })
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
  // console.log(req.body);
  req.user
    .getProducts({ where: { id: id } })
    .then((products) => {
      const product = products[0];
      return product.destroy();
    })
    .then(() => {
      console.log("Product destroyed!");
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      res.redirect("/admin/products");
    });
}

export function getProducts(req, res) {
  req.user
    .getProducts()
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
  res.user
    .getProducts({ where: { id: id } })
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
