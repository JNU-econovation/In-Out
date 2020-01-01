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

  var token = req.headers['x-access-token'] || req.body.token
  console.log(token);

  if (typeof token !== 'undefined') {
    var decoded = jwt.verify(token, "hello");
    console.log(decoded);

    DBForUser.findUserById(decoded, (err, result) => {
      if (err) {
        return res.status(400).json({
          message: "데이터를 저장하지 못하거나 db 연결실패"
        });
      }

      req.user = result;
      next();
    });
  } else {
    res.status(403).send(err.message);
  }
};

exports.tmpFindone = (req, res) => {
  DBForUser.findUserById(req.body.memberId, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "데이터를 찾지 못하거나 db 연결실패"
      });
    }

    return res.send(result);
  });
}