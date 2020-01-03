const toPdf = require('./htmltopdf');
const sender = require("./mailsender");

toProfessor = () => {
    toPdf.toPdf((err, ok) => {
        if (err) return console.log("pdf 변환 실패");
        else {
            sender.sendMail((err, ok) => {
                if (err) return console.log('메일 전송 실패');

                console.log('mail 전송 성공');
            })
        }
    })
}

toProfessor();