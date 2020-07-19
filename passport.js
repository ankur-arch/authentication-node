const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { JWTSECRET } = require("./secrets/secrets");
const User = require("./models/User");

/**
 * To ensure Jwt Strategy is working properly ensure
 * that you have put the token in the header,
 * the strategy
 */
passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("token"), // header parameter name to retrieve token from
      secretOrKey: JWTSECRET, // our secret key
    },
    async (payload, done) => {
      try {
        // extract user info from payload
        console.log(payload.sub);
        console.log(payload);
        const user = await User.findById(payload.sub);
        // if user doesn't exist handle it
        if (!user) {
          return done(null, false);
        }
        //else return user
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

/**
 * This middleware is used when our users
 * login, this is where password validation takes place
 */

passport.use(
  new LocalStrategy(
    { usernameField: "email" }, // identifier user enters for login (can also be username)
    async (email, password, done) => {
      /**
       * Here we retrieve our validated parameters
       * sent by the request body
       * @param {string} email
       * @param {string} password
       * @return {Promise} done method is called and contains (error, payload)
       */
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false);
        }
        const isMatch = await user.passwordValidator(password);
        if (!isMatch) {
          return done(null, false);
        }
        const minifiedUser = { _id: user._id, email: user.email }; // removing password from our user model

        done(null, minifiedUser); // user is attached to request head (req.user)
      } catch (error) {
        done(error, false);
      }
    }
  )
);
