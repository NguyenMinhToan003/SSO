import passport from "passport";
import LocalStrategy from "passport-local";
import loginRegisterService from "../service/loginRegisterService";
const configPassport = async () => {
  passport.use(
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        let rawData = {
          valueLogin: username,
          password: password,
        };
        let respose = await loginRegisterService.handleUserLogin(rawData);
        if (respose && +respose.EC === 0) {
          return done(null, respose.DT);
        } else return done(null, false, { message: respose.EM });
      }
    )
  );
};
const logoutUser = (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect("/");
};
module.exports = {
  configPassport,
  logoutUser,
};
