const toPdf = require("./../../mail/htmltopdf");
const sender = require("./../../mail/mailsender");
const enrollmentsRepository = require("./../../database/transfer/enrollment");
const dateHandler = require("./../../util/date-handler");

const getData = async () => {
  const now = new Date();
  try {
    return await enrollmentsRepository.findAllWithReason(
      dateHandler.getFormatDate(now)
    );
  } catch (err) {
    console.log(err);
  }
};

const toProfessor = async (req, res) => {
  try {
    const data = await getData();
    if (!data || data.length == 0) {
      return res.status(400).json({
        message: "출입 신청 내역 없음 끝",
        errCode: 40
      });
    } else {
      await toPdf.toPdf(data);

      setTimeout(() => {
        sender.sendMail();
      }, 0);
    }
  } catch (err) {
    return res.status(500).json({
      message: "메일 전송 실패",
      errCode: 41
    });
  }
};

module.exports = {
  toProfessor
};
