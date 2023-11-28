import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("node_complete", "postgres", "123", {
  host: "localhost",
  dialect: "postgres",
});

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
