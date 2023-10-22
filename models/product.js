import fs from "node:fs";
import path from "node:path";

export class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((data, filePath) => {
      const obj = {};
      for (const property in this) {
        obj[property] = this[property];
      }
      console.log(obj);
      data.push(obj);

      fs.writeFile(filePath, JSON.stringify(data), (err) => {
        if (err) throw err;
      });
    });
  }

  static fetchAll(callback) {
    return getProductsFromFile(callback);
  }
}

function getProductsFromFile(callback) {
  const filePath = path.join(path.resolve(), "data", "products.json");

  fs.readFile(filePath, (err, data) => {
    if (err) throw err;

    callback(JSON.parse(data), filePath);
  });
}
