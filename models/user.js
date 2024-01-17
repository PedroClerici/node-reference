import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

UserSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });
  console.log(cartProductIndex);

  let updatedCartItems = [...this.cart.items];

  if (cartProductIndex !== -1) {
    updatedCartItems[cartProductIndex].quantity++;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: 1,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;

  return this.save();
};

UserSchema.methods.removeFromCart = function (id) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== id;
  });

  this.cart.items = updatedCartItems;
  return this.save();
};

UserSchema.methods.addOrder = function (id) {
  this.populate("cart.items.productId").then((user) => {
    const products = user.cart.items.map((item) => {
      return { ...item.productId.toObject(), quantity: item.quantity };
    });

    const order = {
      items: products,
      user: {
        _id: this._id,
        username: this.username,
        email: this.email,
      },
    };
    console.log(order);
  });
};

export default new model("User", UserSchema);
