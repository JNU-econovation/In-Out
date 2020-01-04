const toPdf = require("./htmltopdf");
const sender = require("./mailsender");
const enrollmentsRepository = require("./../database/transfer/enrollment");

const getData = async () => {
  try {
    return await enrollmentsRepository.findAllWithReason("2020-1-2");
  } catch (err) {
    console.log(err);
  }
};

toProfessor = async () => {
  try {
    const data = await getData();
    if (!data || data.length == 0) {
      console.log("출입 신청 내역 없음 끝");
      return;
    } else {
      await toPdf.toPdf(data);

      setTimeout(() => {
        sender.sendMail();
      }, 0);
    }
  } catch (err) {
    console.log("교수님께 전송 실패");
  }
};

module.exports = {
  toProfessor
};
