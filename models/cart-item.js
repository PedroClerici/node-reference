import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database.js";

export const CartItem = sequelize.define("cartItem", {
  quantity: {
    type: DataTypes.INTEGER,
  },
});
