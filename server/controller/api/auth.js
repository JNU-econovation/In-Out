const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();
const models = require("./../../database/models");

module.exports = {
  login: (req, res) => {
    passport.authenticate("local", { session: false }, (err, user) => {
      if (err || !user) {
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

        return res.json({ user, token });
      });
    })(req, res);
  },
  tmpInsert: (req, res) => {
    models.User.create({
      memberId: req.body.memberId,
      name: req.body.name,
      password: req.body.password,
      role: req.body.role
    })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        res.send(err);
      });
  }
};
