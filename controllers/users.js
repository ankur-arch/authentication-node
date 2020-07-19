const express = require("express");
const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("../secrets/secrets");

const User = require("../models/User");

const signToken = (user) => {
  return jwt.sign(
    {
      iss: "shikhao.com", //issuer
      sub: user._id,
      iat: new Date().getTime(),
      data: { email: user.email },
    },
    JWTSECRET
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;
    const foundUser = await User.findOne({ email: email });
    if (foundUser) res.status(403).json({ error: "Email is already in use" });
    else {
      const newUser = new User({
        email: email,
        password: password,
      });
      await newUser.save();
      console.log("SignUp called");
      // exclude password from passed params
      const user = { _id: newUser._id, email: newUser.email };
      // Respond with Token alongside our newUser
      const token = signToken(user);
      res.status(200).json({ token });
    }
  },

  /**
   * Our secret route that we need a token to access
   */

  signIn: async (req, res, next) => {
    console.log("SignIn called");
    console.log("our user", req.user);
    res.json({
      entry: "success",
    });
  },

  /**
   * Our secret route that we need a token to access
   */
  secret: async (req, res, next) => {
    console.log("Secret called");
  },
};
