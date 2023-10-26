var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
const UserRouter = require("./routes/backstage/user-router");
const CatRouter = require("./routes/backstage/cat-router");
const WebCatRouter = require("./routes/web/cat-router");
const JWT = require("./utils/jwt");
const FoodRouter = require("./routes/backstage/food-router");
const WebFoodRouter = require("./routes/web/food-router");
const PosterRouter = require("./routes/store/poster-router");
const SFoodRouter = require("./routes/store/food-router");
const CanRouter = require("./routes/store/can-router");
const OrderRouter = require("./routes/store/order-router");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use(WebCatRouter);
app.use(WebFoodRouter);
app.use(PosterRouter);
app.use(SFoodRouter);
app.use(CanRouter);
//------------------------------------------------------------------------------------------------------------------------
/* 拦截没有token的后端数据请求 */
app.use((req, res, next) => {
  if (
    req.url === "/backstage-api/user/login" ||
    req.url === "/backstage-api/cat/content-pic" ||
    req.url === "/backstage-api/user/add"
  ) {
    next();
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  if (token) {
    let payload = JWT.verify(token);
    console.log(payload);
    if (payload) {
      let newToken = JWT.generate(
        { username: payload.username, _id: payload._id },
        "1d"
      );
      res.header("Authorization", newToken);
      next();
    } else {
      res.status(401).send({ errorInfo: "token过期" });
    }
  } else {
    res.status(401).send({ errorInfo: "token不存在" });
  }
});
app.use(OrderRouter);
app.use(UserRouter);
app.use(CatRouter);
app.use(FoodRouter);
//------------------------------------------------------------------------------------------------------------------------
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
