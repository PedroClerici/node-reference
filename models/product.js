import fs from "node:fs";
import path from "node:path";

import { getProductsFromFile } from "../utils/get-products.js";
import { Cart } from "./cart.js";
import { db } from "../utils/database.js";

const filePath = path.join(path.resolve(), "data", "products.json");

export class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    return db.query(
      'INSERT INTO products (title, "imageUrl", price, description) VALUES ($1, $2, $3, $4)',
      [this.title, this.imageUrl, this.price, this.description]
    );
  }

  static fetchAll() {
    return db.query("SELECT * FROM products");
  }

  static fetchById(id) {
    return db.query("SELECT * FROM products WHERE id = $1", [id]);
  }

  static update(product) {
    return db.query(
      'UPDATE products SET title = $2, "imageUrl" = $3, price = $4, description = $5 WHERE id = $1',
      [
        product.id,
        product.title,
        product.imageUrl,
        product.price,
        product.description,
      ]
    );
  }

  // Hint: the id should be a string!
  static delete(id) {
    db.query("DELETE FROM products WHERE id = $1", [id]);
  }
}
