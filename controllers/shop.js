import { Product } from "../models/product.js";
import { Cart } from "../models/cart.js";
import { Order } from "../models/order.js";

export function getProducts(req, res) {
  Product.findAll()
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

  Product.findByPk(id).then((product) => {
    res.render("shop/product-detail.pug", {
      product: product,
      path: "/products",
      pageTitle: `Shop - ${product.title}`,
    });
  });
}

export function getIndex(req, res) {
  Product.findAll()
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
  req.user.getOrders({ include: ["products"] }).then((orders) => {
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
  let newQuantity = 1;
  let fetchedCart;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        let oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }

      return Product.findByPk(productId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      res.redirect("/cart");
    });
}

export function getCart(req, res) {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
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
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then((products) => {
      const product = products[0];
      product.cartItem.destroy();
    })
    .catch((err) => {
      console.log(err);
    });

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

export function postOrder(req, res) {
  let cartProducts;
  let fetchedCart;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      cartProducts = products;
      return req.user.createOrder();
    })
    .then((order) => {
      order.addProducts(
        cartProducts.map((product) => {
          product.orderItem = { quantity: product.cartItem.quantity };
          return product;
        })
      );
    })
    .then(() => {
      return fetchedCart.setProducts(null);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      res.redirect("/orders");
    });
}
