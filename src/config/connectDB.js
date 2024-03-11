const { Sequelize } = require("sequelize");
require("dotenv").config();
// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: process.env.DB_DIALECT,
    // storage: "./session.sqlite",
    logging: false,
    define: {
      freezeTableName: true,
    },
  }
);

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection  been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connection;
