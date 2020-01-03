var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./application.html', 'utf-8');
var option = {
    "format": "a3"
};
pdf.create(html, option).toFile('./tester.pdf', function (err, res) {
    if (err) return console.log(err);
    console.log(res);
});