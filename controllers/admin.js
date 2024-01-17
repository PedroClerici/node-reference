import Product from "../models/product.js";

export function getAddProduct(req, res) {
  res.render("admin/add-product.pug", {
    path: req.originalUrl,
    pageTitle: "Add Product",
    isAuthenticated: req.user,
  });
}

export function postProduct(req, res) {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const user = req.user;

  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
    userId: user,
  });

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

  Product.findById(id)
    .then((product) => {
      product.title = title;
      product.imageUrl = imageUrl;
      product.price = price;
      product.description = description;

      product.save();
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

  Product.findByIdAndDelete(id)
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
  Product.find()
    .then((products) => {
      res.render("admin/products.pug", {
        products: products,
        path: req.originalUrl,
        pageTitle: "Admin Products",
        isAuthenticated: req.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getEditProduct(req, res) {
  const id = req.params.id;
  Product.findById(id)
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
