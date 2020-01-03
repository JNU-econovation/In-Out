const fs = require('fs');
const pdf = require('html-pdf');
const dateHandler = require('./../util/date-handler');

const now = new Date();
let data = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <style>
        td {
            height: 40px;
            border: 1px solid black;
        }

        th {
            height: 35px;
            border: 1px solid black;
            background-color: #a0a0a0;
        }

        table {
            text-align: center;
            width: 100%;
            border: 1px solid black;
            border-collapse: collapse;
        }
    </style>
</head>

<body>
    <h1 style="text-align: center; margin-top: 60px;">정보 전산원 야간 출입 신청서</h1>
    <div style="margin:100px; margin-top: 50px;">
        <div><strong>소속 : EOCONOVATION</strong><br>
            <strong>출입 일시 : </strong> <span id=date>${dateHandler.getFormatDate(now)}</span><span> (${dateHandler.getDayToStr(now)}) 21:00 ~ 24:00</span> <br>
            <strong>목적 : 성과발표회 팀프로젝트 개발 </strong>
        </div>
        <br>
        <div>
            <table style="width: 100%;">
                <tr>
                    <th style="width: 50px;">No.</th>
                    <th style="width: 150px;">이름</th>
                    <th style="width: 500px;">사유</th>
                    <th style="width: 150px;">비고</th>
                </tr>`;

exports.toPdf = async (results) => {
    try {
        const enrolls = results;
        const remain = 18 - enrolls.length;

        for (var i = 0; i < enrolls.length; i++) {

            let tmp = enrolls[i].dataValues;
            if (tmp.user) {
                data += `<tr>
                    <td>${i+1}</td>
                    <td>${tmp.user.dataValues.name}</td>
                    <td>${tmp.reason}</td>
                    <td></td>
                </tr>`
            } else {

                data += `<tr>
                    <td>${i+1}</td>
                    <td></td>
                    <td>${tmp.reason}</td>
                    <td></td>
                </tr>`
            }
        }

        for (var i = enrolls.length; i < enrolls.length + remain; i++) {
            data += `<tr>
        <td>${i+1}</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>`
        }

        data += `</table>
</div>
</div>
<div style="text-align: right; margin-top: -50px; margin-right: 100px; margin-bottom: 40px;">
<h2>정보전산원 담당자</h2> <span>유 재 명 (서명)</span>
</div>
</body>
</html>`

        fs.writeFileSync('./application.html', data, 'utf-8');

        const html = fs.readFileSync('./application.html', 'utf-8');
        const option = {
            "format": "a3"
        };

        pdf.create(html, option).toFile('./enrollment.pdf', (err, info) => {
            if (err) throw err;
            console.log("pdf 변환됨.");
        });
    } catch (err) {
        console.log(err);
    }
}