const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConfig = require("../passport"); // include passport configurations
const postController = require("../controllers/posts");

router.route("/create").post(postController.createPost);
router.route("/show").get(postController.viewPost);
router.route("/update").put(postController.updatePost);
module.exports = router;
