import { Product } from "../models/product.js";

export function getProducts(req, res) {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/products.pug", {
        products: products,
        path: req.originalUrl,
        pageTitle: "Shop",
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getProductById(req, res) {
  const id = req.params.id;

  Product.fetchById(id).then((product) => {
    res.render("shop/product-detail.pug", {
      product: product,
      path: "/products",
      pageTitle: `Shop - ${product.title}`,
    });
  });
}

export function getIndex(req, res) {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index.pug", {
        products: products,
        path: req.originalUrl,
        pageTitle: "Shop",
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getOrders(req, res) {
  req.user.getOrders().then((orders) => {
    console.log(orders);
    res.render("shop/orders.pug", {
      path: req.originalUrl,
      pageTitle: "Your Orders",
      orders: orders,
    });
  });
}

export function postCart(req, res) {
  const productId = req.body.id;

  Product.fetchById(productId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
    })
    .finally(() => {
      res.redirect("/cart");
    });
}

export function getCart(req, res) {
  req.user.getCart().then((products) => {
    console.log(products);
    res.render("shop/cart.pug", {
      products: products,
      // totalPrice: cart.totalPrice,
      totalPrice: 0,
      path: req.originalUrl,
      pageTitle: "Your Cart",
    });
  });
}

export function deleteCart(req, res) {
  const productId = req.body.id;

  req.user
    .deleteItemFromCart(productId)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      res.redirect("/cart");
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

export function postOrder(req, res) {
  req.user
    .addOrder()
    .then(() => {})
    .catch((err) => console.log(err))
    .finally(() => {
      res.redirect("/orders");
    });
}
