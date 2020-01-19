const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const passport = require("passport");

const passportConfig = require("./config/passport");
const db = require("./database/connectionDB");
const indexRouter = require("./routes/index");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
//passport
app.use(passport.initialize());
passportConfig();

//connection DB
db.connect();

app.use("/api", require("./routes/api/auth"));
app.use("/api/admin", require("./routes/api/admin"));
app.use("/api/enrollments", require("./routes/api/enroll"));
app.use("/api/mypage", require("./routes/api/user"));
app.use(indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error(err);
  res.send(err.message);
});

module.exports = app;
