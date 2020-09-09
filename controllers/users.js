const express = require("express");
const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("../secrets/secrets");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const signToken = (user, key = null) => {
  const Key = key !== null ? key : JWTSECRET;
  return jwt.sign(
    {
      iss: "shikhao.com", //issuer
      sub: user._id,
      iat: new Date().getTime(),
      data: { email: user.email },
    },
    Key,
    { expiresIn: "1h" }
  );
};

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.value.body;
    const foundUser = await User.findOne({ email: email });
    if (foundUser)
      return res.status(403).json({ error: "Email is already in use" });
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
    const user = req.user;
    const token = signToken(user);
    res.json({
      entry: "success",
      user: req.user,
      token,
    });
  },

  forgetPasswordPost: async (req, res, next) => {
    const { email, resettoken } = req.value.body;
    const passwordResetToken = resettoken;
    if (passwordResetToken) {
      try {
        const user = await User.findOne(
          { resetPasswordToken: passwordResetToken },
          (err, doc) => {
            if (err) {
              next(err);
            } else {
              if (doc) {
                doc.password = "fuck";
                doc.save();
              } else return res.send("Invalid Token");
            }
          }
        );
      } catch (error) {
        return res.send("Error on the database");
      }
      return res.send("Account does not exist");
    }
    return res.send("Send valid token");
  },
  /**
   * Our secret route that we need a token to access
   */
  secret: async (req, res, next) => {
    console.log("Secret called");
    res.json({
      entry: "success",
      user: req.user,
    });
  },
};
