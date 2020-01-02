var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mysql = require("mysql");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportConfig = require("./config/passport");
const db = require('./database/connectionDB');

var indexRouter = require("./routes/index");
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
//passport
app.use(passport.initialize());
passportConfig();

//connection DB
db.connect();

app.use("/", indexRouter);
app.use("/api", require("./routes/api/auth"));
app.use("/api/admin", require("./routes/api/admin"));
app.use("/api/enrollment", require("./routes/api/enroll"))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;