import { Product } from "../models/product.js";
import { Cart } from "../models/cart.js";

export function getProducts(req, res) {
  Product.fetchAll().then(({ rows }) => {
    res.render("shop/products.pug", {
      products: rows,
      path: req.originalUrl,
      pageTitle: "Shop",
    });
  });
}

export function getProductById(req, res) {
  const id = req.params.id;

  Product.fetchById(id).then(({ rows }) => {
    const product = rows[0];

    res.render("shop/product-detail.pug", {
      product: product,
      path: "/products",
      pageTitle: `Shop - ${product.title}`,
    });
  });
}

export function getIndex(req, res) {
  Product.fetchAll().then(({ rows }) => {
    res.render("shop/index.pug", {
      products: rows,
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

export function postCart(req, res) {
  const productId = req.body.id;
  const productPrice = req.body.price;
  Cart.addProduct(productId, productPrice);

  res.redirect("/cart");
}

export function getCart(req, res) {
  Cart.getCart((cart) => {
    Cart.getProducts((products) => {
      for (const product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );

        if (cart.products.findIndex((prod) => prod.id === product.id) !== -1) {
          product.quantity = cartProductData.quantity.toString();
        }
      }

      console.log(products);

      res.render("shop/cart.pug", {
        products: products,
        totalPrice: cart.totalPrice,
        path: req.originalUrl,
        pageTitle: "Your Cart",
      });
    });
  });
}

export function deleteCart(req, res) {
  const productId = req.body.id;
  const productPrice = req.body.price;
  Cart.deleteProduct(productId, productPrice);

  res.redirect("/cart");
}

export function getCheckout(req, res) {
  Product.fetchAll((products) => {
    res.render("shop/checkout.pug", {
      path: req.originalUrl,
      pageTitle: "Checkout",
    });
  });
}
