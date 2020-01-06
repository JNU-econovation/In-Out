const path = require("path");
const getIndexPage = (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public", "index.html"));
};

module.exports = {
  getIndexPage
};
