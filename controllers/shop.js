import Product from "../models/product.js";
import Order from "../models/order.js";

export function getProducts(req, res) {
  Product.find()
    .then((products) => {
      res.render("shop/products.pug", {
        products: products,
        path: req.originalUrl,
        pageTitle: "Shop",
        isAuthenticated: req.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getProductById(req, res) {
  const id = req.params.id;

  Product.findById(id).then((product) => {
    res.render("shop/product-detail.pug", {
      product: product,
      path: "/products",
      pageTitle: `Shop - ${product.title}`,
      isAuthenticated: req.user,
    });
  });
}

export function getIndex(req, res) {
  console.log(req.user);
  Product.find()
    .then((products) => {
      res.render("shop/index.pug", {
        products: products,
        path: req.originalUrl,
        pageTitle: "Shop",
        isAuthenticated: req.user,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function getOrders(req, res) {
  Order.find({ "user.userId": req.user._id }).then((orders) => {
    console.log(orders);
    res.render("shop/orders.pug", {
      path: req.originalUrl,
      pageTitle: "Your Orders",
      orders: orders,
      isAuthenticated: req.user,
    });
  });
}

export function postCart(req, res) {
  const productId = req.body.id;

  Product.findById(productId)
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
  req.user.populate("cart.items.productId").then((user) => {
    const products = user.cart.items.map((item) => {
      return { ...item.productId.toObject(), quantity: item.quantity };
    });

    console.log(products);
    res.render("shop/cart.pug", {
      products: products,
      // totalPrice: cart.totalPrice,
      totalPrice: 0,
      path: req.originalUrl,
      pageTitle: "Your Cart",
      isAuthenticated: req.user,
    });
  });
}

export function deleteCart(req, res) {
  const productId = req.body.id;

  req.user
    .removeFromCart(productId)
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
      isAuthenticated: req.user,
    });
  });
}

export function postOrder(req, res) {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((item) => {
        return {
          product: { ...item.productId._doc },
          quantity: item.quantity,
        };
      });

      const order = new Order({
        products: products,
        user: {
          userId: user._id,
          username: user.username,
          email: user.email,
          isAuthenticated: req.user,
        },
      });

      return order.save();
    })
    .then(() => {
      req.user.cart.items = [];
      return req.user.save();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      res.redirect("/orders");
    });
}
