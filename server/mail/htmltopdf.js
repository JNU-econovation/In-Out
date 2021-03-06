const fs = require("fs");
const pdf = require("html-pdf");
const dateHandler = require("./../util/date-handler");

let data = "";

const toPdf = async (results, callback) => {
  const now = new Date();
  try {
    if (!results.length) throw new Error("예약이 없습니다.");
    data += `<!DOCTYPE html>
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
                <strong>출입 일시 : </strong> <span id=date>${dateHandler.getFormatDate(
                  now
                )}</span><span> (${dateHandler.getDayToStr(
      now
    )}) 21:00 ~ 24:00</span> <br>
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
    const enrolls = results;
    const remain = 18 - enrolls.length;

    for (var i = 0; i < enrolls.length; i++) {
      let tmp = enrolls[i].dataValues;
      if (tmp.user) {
        data += `<tr>
                    <td>${i + 1}</td>
                    <td>${tmp.user.dataValues.name}</td>
                    <td>${tmp.reason}</td>
                    <td></td>
                </tr>`;
      } else {
        data += `<tr>
                    <td>${i + 1}</td>
                    <td></td>
                    <td>${tmp.reason}</td>
                    <td></td>
                </tr>`;
      }
    }

    for (var i = enrolls.length; i < enrolls.length + remain; i++) {
      data += `<tr>
        <td>${i + 1}</td>
        <td></td>
        <td></td>
        <td></td>
    </tr>`;
    }

    data += `</table>
</div>
</div>
<div style="text-align: right; margin-top: -50px; margin-right: 100px; margin-bottom: 40px;">
<h2>정보전산원 담당자</h2> <span>유 재 명 (서명)</span>
</div>
</body>
</html>`;

    //동적으로 html 파일을 생성
    fs.writeFileSync("./application.html", data, "utf-8");

    const html = fs.readFileSync("./application.html", "utf-8");
    const option = {
      format: "a3"
    };

    //pdf로 변환
    pdf.create(html, option).toFile("./enrollment.pdf", (err, info) => {
      if (err) throw err;
      console.log("pdf 변환됨.");
      callback();
      data = "";
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  toPdf
};
