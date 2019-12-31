const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();

module.exports = {
  login: (req, res) => {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err || !user) {
        console.log(err);

        return res.status(400).json({
          message: "Something is not right",
          user: user
        });
      }

      req.login(user, { session: false }, err => {
        if (err) {
          res.send(err);
        }

        //jwt.sign("token내용", "JWT secretkey");
        const token = jwt.sign(user, "hello");
        console.log(token);

        return res.json({ user, token });
      });
    })(req, res);
  }
};
