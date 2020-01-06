const jwt = require("jsonwebtoken");
const passport = require("passport");
const key = require("./../../config/keys.json");

login = (req, res) => {
  passport.authenticate(
    "local",
    {
      session: false
    },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          message: "Something is not right"
        });
      }

      req.login(
        user,
        {
          session: false
        },
        err => {
          if (err) {
            return res.status(400).json({
              message: "login Fail"
            });
          }

          const tokenUser = {
            memberId: user.memberId,
            role: user.role
          };

          const token = jwt.sign(tokenUser, key.tokenKey);

          return res.json({
            token
          });
        }
      );
    }
  )(req, res);
};

verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"] || req.body.token;

  if (typeof token !== "undefined") {
    const decoded = jwt.verify(token, key.tokenKey);
    req.user = decoded;
    next();
  } else {
    res.status(403).send("인증 안됨.");
  }
};

module.exports = {
  verifyToken,
  login
};
