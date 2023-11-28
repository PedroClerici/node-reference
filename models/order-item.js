import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database.js";

export const OrderItem = sequelize.define("orderItem", {
  quantity: {
    type: DataTypes.INTEGER,
  },
});
