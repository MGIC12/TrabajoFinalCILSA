const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("to-do-list", "root", "", {
  dialect: "mysql",
  port: 3306,
  host: "localhost",
});

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
