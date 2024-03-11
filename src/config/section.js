import Sequelize from "sequelize";
import session from "express-session";
require("dotenv").config();
const configSection = (app) => {
  // initalize sequelize with session store
  var SequelizeStore = require("connect-session-sequelize")(session.Store);

  // create database, ensure 'sqlite3' in your package.json
  var sequelize = new Sequelize(
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

  // configure express
  var app = express();
  app.use(
    session({
      secret: "keyboard cat",
      store: new SequelizeStore({
        db: sequelize,
      }),
      resave: false, // we support the touch method so per the express-session docs this should be set to false
      proxy: true, // if you do SSL outside of node.
    })
  );
};

export default configSection;
