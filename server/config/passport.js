const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const userRepository = require("./../database/transfer/user");
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
          let user = await userRepository.findUserById(memberId);

          if (await bcrypt.compare(password, user.password)) {
            return done(null, user, {
              message: "Logged In Successfully"
            });
          }
          return done(null, false, {
            message: "Incoreect memberID or password",
            errCode: "20"
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
        userRepository.findUserById(jwtPayload.memberId, (err, user) => {
          if (err) {
            return done(err);
          }

          if (user.password == password) {
            return done(null, user, {
              message: "Logged In Successfully"
            });
          }
          return done(null, false, {
            message: "Incoreect memberID or password",
            errCode: "20"
          });
        });
      }
    )
  );
};
