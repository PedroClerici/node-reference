import { Product } from "../models/product.js";

export function getProducts(req, res) {
  Product.fetchAll((products) => {
    res.render("shop/products.pug", {
      products: products,
      path: req.originalUrl,
      pageTitle: "Shop",
    });
  });
}

export function getIndex(req, res) {
  Product.fetchAll((products) => {
    res.render("shop/index.pug", {
      products: products,
      path: req.originalUrl,
      pageTitle: "Shop",
    });
  });
}

export function getOrders(req, res) {
  Product.fetchAll((products) => {
    res.render("shop/orders.pug", {
      path: req.originalUrl,
      pageTitle: "Your Orders",
    });
  });
}

export function getCart(req, res) {
  Product.fetchAll((products) => {
    res.render("shop/cart.pug", {
      path: req.originalUrl,
      pageTitle: "Your Cart",
    });
  });
}

export function getCheckout(req, res) {
  Product.fetchAll((products) => {
    res.render("shop/checkout.pug", {
      path: req.originalUrl,
      pageTitle: "Checkout",
    });
  });
}
