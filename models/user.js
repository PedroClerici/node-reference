import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database.js";

export const User = sequelize.define("user", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
