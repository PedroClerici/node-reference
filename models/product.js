import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database.js";

export const Product = sequelize.define("product", {
  // id: {
  //   type: DataTypes.NUMBER,
  //   autoIncrement: true,
  //   primaryKey: true,
  // },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
