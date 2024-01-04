import { getDb } from "../utils/database.js";
import { ObjectId } from "mongodb";

export class User {
  constructor(username, email, cart, id) {
    this.username = username;
    this.email = email;
    this.cart = cart;
    this._id = id ? new ObjectId(id) : null;
  }

  save() {
    const db = getDb();

    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    console.log(cartProductIndex);

    let updatedCartItems = [...this.cart.items];

    if (cartProductIndex !== -1) {
      updatedCartItems[cartProductIndex].quantity++;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: 1,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    const db = getDb();
    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
  }

  getCart() {
    const db = getDb();
    const cartItems = this.cart.items;
    const productIds = cartItems.map((item) => item.productId);
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((product) => {
          return {
            ...product,
            quantity: cartItems.find((item) => {
              return product._id.toString() === item.productId.toString();
            }).quantity,
          };
        });
      });
  }

  deleteItemFromCart(id) {
    const db = getDb();
    const updatedCartItems = this.cart.items.filter(
      (item) => item.productId.toString() !== id,
    );

    return db
      .collection("users")
      .updateOne(
        { _id: this._id },
        { $set: { cart: { items: updatedCartItems } } },
      );
  }

  addOrder() {
    const db = getDb();

    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: {
            _id: this._id,
            username: this.username,
            email: this.email,
          },
        };

        return db.collection("orders").insertOne(order);
      })
      .then(() => {
        this.cart = { items: [] };
        db.collection("users").updateOne(
          { _id: this._id },
          { $set: { cart: { items: [] } } },
        );
      });
  }

  getOrders() {
    const db = getDb();

    return db.collection("orders").find({ "user._id": this._id }).toArray();
  }

  static fetchById(id) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(id) })
      .then((user) => {
        return user;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
