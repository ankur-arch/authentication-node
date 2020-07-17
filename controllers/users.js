const express = require("express");
const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("../secrets/secrets");

const User = require("../models/User");

const signToken = (user) => {
  return jwt.sign(
    {
      iss: "shikhao.com",
      sub: user._id,
      iat: new Date().getTime(),
      exp: 60 * 60 * 60,
      data: { email: user.email, password: user.password },
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
      // Respond with Token
      const token = signToken(newUser);
      res.status(200).json({ token });
    }
  },
  signIn: async (req, res, next) => {
    console.log("SignIn called");
  },
  secret: async (req, res, next) => {
    console.log("Secret called");
  },
};
