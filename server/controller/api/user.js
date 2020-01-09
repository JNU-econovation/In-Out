const userRepository = require("../../database/transfer/user");
const bcrypt = require("bcryptjs");

const updatePassword = async (req, res) => {
  const encryptedPassoword = await encryptPassword(req.body.changedPassword);

  try {
    await userRepository.changePassword(req.body.memberId, encryptedPassoword);
  } catch (error) {
    console.log("에러 ", error.message);
    res.status(403).json({
      message: error.message
    });
  }

  return res.status(200).json({
    message: "비밀번호 변경 완료"
  });
};

const encryptPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

module.exports = {
  updatePassword
};
