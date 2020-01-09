const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const DBForUser = require("./../database/transfer/user");
const key = require("./../config/keys.json");
const bcrypt = require("bcryptjs");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "memberId",
        passwordField: "password"
      },
      async (memberId, password, done) => {
        try {
          let user = await DBForUser.findUserById(memberId);

          if (bcrypt.compare(password, user.password)) {
            return done(null, user, {
              message: "Logged In Successfully"
            });
          }
          return done(null, false, {
            message: "Incoreect memberID or password"
          });
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  //JWT Strategy
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: key.tokenKey
      },
      (jwtPayload, done) => {
        DBForUser.findUserById(jwtPayload.memberId, (err, user) => {
          if (err) {
            return done(err);
          }

          if (user.password == password) {
            return done(null, user, {
              message: "Logged In Successfully"
            });
          }
          return done(null, false, {
            message: "Incoreect memberID or password"
          });
        });
      }
    )
  );
};
