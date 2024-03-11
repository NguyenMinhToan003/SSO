import Sequelize from "sequelize";
import session from "express-session";
require("dotenv").config();
import passport from "passport";
const configSession = (app) => {
  // initalize sequelize with session store
  const SequelizeStore = require("connect-session-sequelize")(session.Store);

  // create database, ensure 'sqlite3' in your package.json
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

  const myStore = new SequelizeStore({
    db: sequelize,
  });
  // configure express

  app.use(
    session({
      secret: "keyboard cat",
      store: myStore,
      resave: false, // we support the touch method so per the express-session docs this should be set to false
      saveUninitialized: false,
      proxy: true, // if you do SSL outside of node.
    })
  );
  myStore.sync();
  app.use(passport.authenticate("session"));

  // ma hoa
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, user);
    });
  });

  // giai ma
  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

export default configSession;
