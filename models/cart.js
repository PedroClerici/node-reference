import fs from "node:fs";
import path from "node:path";

import { Product } from "./product.js";

const filePath = path.join(path.resolve(), "data", "cart.json");

export class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(filePath, (error, data) => {
      if (error) throw error;

      let cart = JSON.parse(data);

      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity++;

        // cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice += +productPrice;

      fs.writeFile(filePath, JSON.stringify(cart), (error) => {
        if (error) throw error;
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(filePath, (error, data) => {
      if (error) throw error;

      let cart = JSON.parse(data);

      const updatedProducts = cart.products.filter(
        (product) => product.id !== id
      );

      if (updatedProducts === cart.products) {
        return;
      }

      const product = cart.products.find((product) => product.id === id);

      cart.products = updatedProducts;
      cart.totalPrice -= productPrice * product.quantity;

      fs.writeFile(filePath, JSON.stringify(cart), (error) => {
        if (error) throw error;
      });
    });
  }

  static getCart(callback) {
    fs.readFile(filePath, (error, data) => {
      if (error) throw error;

      const cart = JSON.parse(data);
      callback(cart);
    });
  }

  static getProducts(callback) {
    Product.fetchAll((products) => {
      fs.readFile(filePath, (error, data) => {
        if (error) throw error;

        const cart = JSON.parse(data);
        const cartProductsId = [];

        for (const cartProduct of cart.products) {
          cartProductsId.push(cartProduct.id);
        }

        const cartProducts = products.filter((product) =>
          cartProductsId.includes(product.id)
        );

        callback(cartProducts);
      });
    });
  }
}
