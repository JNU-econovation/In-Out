const userRepository = require("../../database/transfer/user");
const bcrypt = require("bcryptjs");

const updatePassword = async (req, res) => {
  try {
    const memberId = req.user.memberId;
    const oldPasswword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const encryptedPassoword = encryptPassword(newPassword);
    const user = await userRepository.findUserById(memberId);
    const matching = await bcrypt.compare(oldPasswword, user.password);

    if (!matching)
      return res.status(403).json({
        message: "기존 비밀번호가 일치하지 않습니다.",
        errCode: "20"
      });

    if (oldPasswword === newPassword) {
      return res.status(403).json({
        message: "변경할 비밀번호가 기존 비밀번호와 동일합니다.",
        errCode: "23"
      });
    }

    await userRepository.changePassword(memberId, encryptedPassoword);

    return res.status(200).json({
      message: "비밀번호 변경 완료"
    });
  } catch (error) {
    return res.status(403).json({
      message: error.message,
      errCode: "14"
    });
  }
};

const encryptPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

module.exports = {
  updatePassword
};
