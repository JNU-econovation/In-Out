const fs = require("fs");

const getIndexPage = (req, res) => {
  fs.readFile("/index.html", (err, data) => {
    if (err) console.log("index.html 파일을 읽지 못하였습니다.");

    res.end(data);
  });
};

module.exports = {
  getIndexPage
};
