import express from "express";
import homeController from "../controller/homeController";
import apiController from "../controller/apiController";
import passport from "passport";
import loginController from "../controller/loginController";
import checkUser from "../middleware/checkUser";
import PassportController from "../controller/passportController";

const router = express.Router();
/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  //path, handler
  router.all("*", checkUser.isLogin);
  router.get("/", homeController.handleHelloWord);
  router.get("/user", homeController.handleUserPage);
  router.post("/users/create-user", homeController.handleCreateNewUser);
  router.post("/delete-user/:id", homeController.handleDelteUser);
  router.get("/update-user/:id", homeController.getUpdateUserPage);
  router.post("/user/update-user", homeController.handleUpdateUser);

  //rest api
  //GET - R, POST- C, PUT - U, DELETE - D
  router.get("/api/test-api", apiController.testApi);
  router.get("/login", loginController.loginLocal);
  // router.post(
  //   "/login",
  //   passport.authenticate("local", {
  //     successRedirect: "/",
  //     failureRedirect: "/login",
  //   })
  // );
  app.post("/login", function (req, res, next) {
    passport.authenticate(`local`, function (error, user, info) {
      if (error) {
        return res.status(500).json(error);
      }
      if (!user) {
        return res.status(401).json(info.message);
      }
      // luu thong tin vao session -> khong co khong luu passport vao session duoc
      req.login(user, function (error) {
        if (error) next(error);
        return res.status(200).json(user);
      });
    })(req, res, next);
  });

  router.post("/logout", PassportController.logoutUser);

  return app.use("/", router);
};

export default initWebRoutes;
