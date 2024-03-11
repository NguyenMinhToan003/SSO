import passport from "passport";
import LocalStrategy from "passport-local";
import loginRegisterService from "../service/loginRegisterService";
const configPassport = async () => {
  passport.use(
    new LocalStrategy(async function verify(username, password, cb) {
      let rawData = {
        valueLogin: username,
        password: password,
      };
      let respose = await loginRegisterService.handleUserLogin(rawData);

      if (respose && +respose.EC === 0) {
        return cb(null, respose.DT);
      } else return cb(null, false, { message: respose.EM });
    })
  );
};

module.exports = {
  configPassport,
};
