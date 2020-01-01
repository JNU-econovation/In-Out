const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require('./../../config/keys.json')

exports.login = (req, res) => {
  passport.authenticate("local", {
    session: false
  }, (err, user) => {

    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right"
      });
    }

    req.login(user, {
      session: false
    }, err => {
      if (err) {
        return res.status(400).json({
          message: "login Fail"
        });
      }

      let tokenUser = {
        memberId: user.memberId,
        role: user.role
      }

      const token = jwt.sign(tokenUser, key.tokenKey);

      return res.json({
        token
      });
    });
  })(req, res);
};

exports.verifyToken = (req, res, next) => {

  let token = req.headers['x-access-token'] || req.body.token;

  if (typeof token !== 'undefined') {
    let decoded = jwt.verify(token, key.tokenKey);
    req.user = decoded;
    next();
  } else {
    res.status(403).send("인증 안됨.");
  }
};