const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require("passport-local").Strategy;
require("dotenv").config();

module.exports = () => {
  // Local Strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "memberId",
        passwordField: "password"
      },
      function(email, password, done) {
        // 이 부분에선 저장되어 있는 User를 비교하면 된다.
        console.log(email + " " + password);

        if (!(email == "test" && password == "1111")) {
          return done(null, false, {
            message: "Incoreect memberID or passord"
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
      function(jwtPayload, done) {
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
