const nodemailer = require("nodemailer");
const dateHandler = require("./../util/date-handler");
const emailConfig = require("./../config/mailconfig.json");

const now = new Date();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: emailConfig.senderEmail,
    pass: emailConfig.senderPassword
  }
});

const mailOptions = {
  from: emailConfig.senderEmail,
  to: emailConfig.receiverEmail,
  subject: `${dateHandler.getFormatDate(now)} 출입 신청서`,
  html: `에코노베이션 ${now.getFullYear()}년 ${now.getMonth() +
    1}월 ${now.getDate()}일자 출입신청서 제출합니다.\n\n에코노베이션 올림`,
  attachments: [
    {
      filename: dateHandler.getFormatDate(now) + "출입신청.pdf",
      path: "./enrollment.pdf",
      contentType: "application/pdf"
    }
  ]
};

const sendMail = async () => {
  try {
    await transporter.sendMail(mailOptions);
    transporter.close();
    console.log(new Date() + " - mail success");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sendMail
};
