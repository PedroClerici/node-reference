import path from "node:path";

import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

import adminRoutes from "./routes/admin.js";
import shopRoutes from "./routes/shop.js";
import { get404 } from "./controllers/error.js";
import { sequelize } from "./utils/database.js";
import { Product } from "./models/product.js";
import { User } from "./models/user.js";
import { Cart } from "./models/cart.js";
import { CartItem } from "./models/cart-item.js";
import { Order } from "./models/order.js";
import { OrderItem } from "./models/order-item.js";

const app = express();
const port = 8000;

app.set("view engine", "pug");
app.set("views", "views");

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

// Sync sequelize models to the database!
sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    // console.log(result);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "John Doe", email: "john.doe@example.com" });
    }
    return user;
  })
  .then((user) => {
    // console.log(user);
    return user.createCart();
  })
  .catch((err) => {
    console.log(err);
  });

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(express.static(path.join(path.resolve(), "public")));
app.use("/", bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(get404);

app.listen(port);
