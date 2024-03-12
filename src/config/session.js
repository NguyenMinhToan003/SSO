import Sequelize from "sequelize";
import session from "express-session";
require("dotenv").config();
import passport from "passport";
const configSession = (app) => {
  // initalize sequelize with session store
  const SequelizeStore = require("connect-session-sequelize")(session.Store);

  // create database
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
      timezone: `+07:00`,
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
      expiration: 200 * 1000,
      cookie: { expires: 200 * 1000 },
    })
  );
  myStore.sync();
  app.use(passport.authenticate("session"));

  // ma hoa khi nhap vao login
  passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
      cb(null, user);
    });
  });

  // giai ma du lieu tren server khi load lai trang so sanh no voi cookie
  passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

export default configSession;
