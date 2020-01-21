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
        return res.status(500).json({
          message: "Something is not right",
          errCode: "22"
        });
      }

      req.login(
        user,
        {
          session: false
        },
        err => {
          if (err) {
            return res.status(403).json({
              message: "login Fail",
              errCode: "20"
            });
          }

          const tokenUser = {
            memberId: user.memberId,
            role: user.role,
            name: user.name
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
    res.status(403).json({
      message: "인증을 하지 못하였습니다.",
      errCode: "22"
    });
  }
};

module.exports = {
  verifyToken,
  login
};
