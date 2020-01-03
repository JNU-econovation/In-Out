const userRepository = require("../../database/transfer/user");

const updatePassword = async (req, res) => {
  try {
    await userRepository.changePassword(
      req.body.memberId,
      req.body.changedPassword
    );
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

module.exports = {
  updatePassword
};
