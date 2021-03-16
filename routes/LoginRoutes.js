const LoginController = require("../controllers/LoginController");

module.exports = (app) => {
  //mobile
  app.post("/api/v1/login", LoginController.mobileLogin);
  app.post("/api/v1/validate-phone", LoginController.validatePhoneNumber);
  app.post("/api/v1/change-password", LoginController.changePassword);

  //web
  app.get("/", LoginController.loginPage);
  app.post("/login", LoginController.login);
  app.post("/profile", LoginController.changeWebPassword);
  app.get("/profile", LoginController.getProfilePage);
  app.get("/logout", LoginController.logout);
  app.get("/2fa", LoginController._2fa);
  app.post("/2fa", LoginController._2faValidate);
};
