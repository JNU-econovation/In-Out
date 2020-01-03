const nodemailer = require('nodemailer');
const dateHandler = require('../util/date-handler');

const now = new Date();
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'econovation.kr@gmail.com',
        pass: 'ecnv2019'
    },
});


const mailOptions = {
    from: 'jbj616@mail.com',
    to: 'jbj616@naver.com',
    subject: `${dateHandler.getFormatDate(now)} 출입 신청 내역`,
    html: 'data',
    attachments: [{
        filename: '출입신청.pdf',
        path: './tester.pdf',
        contentType: 'application/pdf'
    }]
}

exports.sendMail = async () => {
    try {
        await transporter.sendMail(mailOptions);
        transporter.close();
        console.log(new Date() + '- mail success');
    } catch (err) {
        console.log("mail fail");
    }
}