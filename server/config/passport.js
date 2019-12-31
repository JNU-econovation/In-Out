const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
const DBForUser = require('./../database/transfer/user');
require("dotenv").config();

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

          if (user.memberId == memberId && user.password == password) {
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
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: "hello"
      },
      (jwtPayload, done) => {
        var user = {
          memberId: 1234,
          password: "1111"
        };
        return done(null, user);
        // return UserModel.findOneById(jwtPayload.id)
        //   .then(user => {
        //     return done(null, user);
        //   })
        //   .catch(err => {
        //     return done(err);
        //   });
      }
    )
  );
};