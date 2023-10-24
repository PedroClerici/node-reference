import fs from "node:fs";
import path from "node:path";

import { getProductsFromFile } from "../utils/get-products.js";
import { Cart } from "./cart.js";

const filePath = path.join(path.resolve(), "data", "products.json");

export class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
    this.id = Math.random().toString();
  }

  save() {
    getProductsFromFile(filePath, (products, filePath) => {
      const obj = {};
      for (const property in this) {
        obj[property] = this[property];
      }

      products.push(obj);

      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        if (err) throw err;
      });
    });
  }

  static fetchAll(callback) {
    return getProductsFromFile(filePath, callback);
  }

  // Hint: the id should be a string!
  static fetchById(id, callback) {
    getProductsFromFile(filePath, (products) => {
      callback(products.find((product) => product.id === id));
    });
  }

  static update(product) {
    getProductsFromFile(filePath, (products) => {
      const updatedProductIndex = products.findIndex(
        (oldProducts) => oldProducts.id === product.id
      );

      products[updatedProductIndex] = product;

      fs.writeFile(filePath, JSON.stringify(products), (err) => {
        if (err) throw err;
      });
    });
  }

  // Hint: the id should be a string!
  static delete(id) {
    getProductsFromFile(filePath, (products) => {
      const product = products.find((product) => product.id === id);
      const updatedProducts = products.filter((product) => product.id !== id);

      // Delete the product also in the cart
      Cart.deleteProduct(id, product.price);

      fs.writeFile(filePath, JSON.stringify(updatedProducts), (err) => {
        if (err) throw err;
      });
    });
  }
}
