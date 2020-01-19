const DBForUser = require("./../../database/transfer/user");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  let user = req.body;
  user.password = encryptPassword(user.password);

  try {
    const result = await DBForUser.insertUser(req.body);
    return res.send(result);
  } catch (err) {
    return res.status(500).json({
      message: "데이터를 저장하지 못하거나 db 연결실패",
      errCode: "11",
      content: err.message
    });
  }
};

const isAdmin = (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.status(403).json({
      message: "토큰이 올바르지 않습니다.",
      errCode: "20"
    });
  }

  if (user.role !== 2) {
    return res.status(403).json({
      message: "권한이 없습니다.",
      errCode: "21"
    });
  }

  next();
};

const changeRole = async (req, res) => {
  const memberIdForUpdate = req.body.memberId;
  const roleForUpdate = req.body.role;

  try {
    await DBForUser.changeRole(memberIdForUpdate, roleForUpdate);

    return res.status(200).json({
      role: roleForUpdate
    });
  } catch (err) {
    return res.status(500).json({
      message: "데이터 베이스에 수정사항을 반영하지 못하였습니다.",
      errCode: "13"
    });
  }
};

const encryptPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

module.exports = {
  changeRole,
  isAdmin,
  createUser
};
