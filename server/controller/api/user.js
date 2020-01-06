const userRepository = require("../../database/transfer/user");
const bcrypt = require("bcryptjs");

const updatePassword = async (req, res) => {
  const memberId = await req.body.memberId;
  const oldPasswword = await req.body.oldPassword;
  const newPassword = await req.body.newPassword;
  const newPasswordForCheck = await req.body.newPasswordForCheck;
  const encryptedPassoword = await encryptPassword(newPassword);

  try {
    const user = await userRepository.findUserById(memberId);
    await bcrypt.compare(oldPasswword, user.password).then(matching => {
      if (matching) {
        if (newPassword !== newPasswordForCheck) {
          return res.status(403).json({
            message: "변경할 비밀번호가 일치하지 않습니다.",
            errCode: "23"
          });
        }

        if (oldPasswword === newPassword) {
          return res.status(403).json({
            message: "변경할 비밀번호가 기존 바밀번호와 동일합니다."
          });
        }

        userRepository.changePassword(memberId, encryptedPassoword);
      } else {
        return res.status(403).json({
          message: "기존 비밀번호가 일치하지 않습니다.",
          errCode: "20"
        });
      }
    });
  } catch (error) {
    console.log("에러 ", error.message);
    res.status(403).json({
      message: error.message,
      errCode: "14"
    });
  }

  return res.status(200).json({
    message: "비밀번호 변경 완료"
  });
};

const encryptPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  console.log(bcrypt.hashSync(password, salt));
  return bcrypt.hashSync(password, salt);
};

module.exports = {
  updatePassword
};
