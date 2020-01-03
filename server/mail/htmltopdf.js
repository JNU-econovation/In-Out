const fs = require('fs');
const pdf = require('html-pdf');
const enrollmentsRepository = require('./../database/transfer/enrollment');

const getData = async () => {
    try {
        return await enrollmentsRepository.getEnrollmentsByDate('2020-1-2')
    } catch (err) {
        console.log(err);
    }
};

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
            <strong>야간 출입 : </strong> <span id=date></span><br>
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

exports.toPdf = (callback) => getData().then((enrolls) => {
    var remain = 18 - enrolls.length;

    for (var i = 0; i < enrolls.length; i++) {
        var tmp = enrolls[i].dataValues;
        data += `<tr>
        <td>${i+1}</td>
        <td>${tmp.userMemberId}</td>
        <td>${tmp.reason}</td>
        <td></td>
    </tr>`
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

    var html = fs.readFileSync('./application.html', 'utf-8');
    var option = {
        "format": "a3"
    };
    pdf.create(html, option).toFile('./tester.pdf', function (err, res) {
        if (err) callback(err, null);
        callback(null, "ok")
    });
})