const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "memberId",
        passwordField: "password"
      },
      (memberId, password, done) => {
        if (!(memberId == "test" && password == "1111")) {
          return done(null, false, {
            message: "Incoreect memberID or password"
          });
        } else {
          var user = {
            memberId: "test",
            password: "1111"
          };
          return done(null, user, { message: "Logged In Successfully" });
        }
        //     return UserModel.findOne({
        //       where: { email: email, password: password }
        //     })
        //       .then(user => {
        //         if (!user) {
        //           return done(null, false, {
        //             message: "Incorrect memberId or password."
        //           });
        //         }
        //         return done(null, user, { message: "Logged In Successfully" });
        //       })
        //       .catch(err => done(err));
      }
    )
  );

  //JWT Strategy
  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: "hello"
      },
      (jwtPayload, done) => {
        var user = {
          memberId: "test",
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
