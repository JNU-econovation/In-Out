const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();
const DBForUser = require('./../../database/transfer/user');

exports.login = (req, res) => {
  passport.authenticate("local", {
    session: false
  }, (err, user) => {

    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }

    req.login(user, {
      session: false
    }, err => {
      if (err) {
        return res.status(400).json({
          message: "login Fail",
          user: user
        });
      }
      //jwt.sign("token내용", "JWT secretkey");
      const token = jwt.sign(user.memberId, "hello");

      return res.json({
        user,
        token
      });
    });
  })(req, res);
};

exports.verifyToken = (req, res, next) => {

  let token = req.headers['x-access-token'] || req.body.token;

  if (typeof token !== 'undefined') {
    let decoded = jwt.verify(token, "hello");
    req.memberId = decoded;
    next();
  } else {
    res.status(403).send("인증 안됨.");
  }
};