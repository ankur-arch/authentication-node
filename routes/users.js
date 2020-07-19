const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const usersController = require("../controllers/users");
const { validateBody, schemas } = require("../validator/bodyValidator");
const passportConfig = require("../passport"); // include passport configurations

router
  .route("/signup")
  .post(validateBody(schemas.authSchema), usersController.signUp);

router
  .route("/signin")
  .post(
    validateBody(schemas.authSchema),
    passport.authenticate("local", { session: false }),
    usersController.signIn
  );

router
  .route("/secret")
  .get(
    passport.authenticate("jwt", { session: false }),
    usersController.secret
  );

module.exports = router;
