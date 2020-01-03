const toPdf = require('./htmltopdf');
const sender = require("./mailsender");

toProfessor = async () => {
    try {
        await toPdf.toPdf();
        await sender.sendMail();
    } catch (err) {
        console.log('교수님께 전송 실패');
    }
}
toProfessor();