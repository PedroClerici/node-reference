import { getDb } from "../utils/database.js";
import { ObjectId } from "mongodb";

export class Product {
  constructor(title, imageUrl, price, descripiton, id, userId) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = descripiton;
    this._id = id ? new ObjectId(id) : null;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;

    if (this._id) {
      console.log(this);
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }

    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static fetchById(id) {
    const db = getDb();
    return db
      .collection("products")
      .findOne({ _id: new ObjectId(id) })
      .then((product) => {
        return product;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new ObjectId(id) })
      .then((product) => {
        return product;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
