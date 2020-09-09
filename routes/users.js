const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const usersController = require("../controllers/users");
const {
  validateEmail,
  validateBody,
  schemas,
} = require("../validator/bodyValidator");
const passportConfig = require("../passport"); // include passport configurations
const { roleAllowed } = require("../permissions/general-permissions");

router
  .route("/signup")
  .post(validateBody(schemas.authSchema), usersController.signUp);

router.route("/signin").post(
  validateBody(schemas.authSchema),
  (req, res, next) => {
    /**
     * passport.authenticate returns a function and hence Im passing
     * in a req, res, next so that I can notify the user that their email or password
     * is incorrect
     * */
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        next(err);
      } else {
        if (!user) {
          // user gave in an incorrect email or password
          return res.status(401).json(info);
        }
        req.user = user;
        next();
      }
      next();
    })(req, res, next);
  },
  usersController.signIn
);

router
  .route("/forgotpassword")
  .post(validateEmail(schemas.emailSchema), usersController.forgetPasswordPost);

router
  .route("/secret")
  .get(
    passport.authenticate("jwt", { session: false }),
    roleAllowed("batpar"),
    usersController.secret
  );

module.exports = router;
