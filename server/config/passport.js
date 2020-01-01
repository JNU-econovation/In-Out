const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const DBForUser = require('./../database/transfer/user');
const key = require("./../config/keys.json");

module.exports = () => {
  passport.use(
    new LocalStrategy({
        usernameField: "memberId",
        passwordField: "password"
      },
      (memberId, password, done) => {
        return DBForUser.findUserById(memberId, (err, user) => {

          if (err) {
            return done(err);
          }

          if (user.password == password) {
            return done(null, user, {
              message: "Logged In Successfully"
            })
          }
          return done(null, false, {
            message: "Incoreect memberID or password"
          });
        });
      }
    )
  );

  //JWT Strategy
  passport.use(
    new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
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
            })
          }
          return done(null, false, {
            message: "Incoreect memberID or password"
          });
        });
      }
    )
  );
};