const EXPRESS = require("express");
const APP = EXPRESS();
const USER_ROUTER = require("./routes/userRouter");
const WEB_ROUTER = require("./routes/webRouter");

APP.use(
  EXPRESS.urlencoded({
    extended: true,
  })
);
APP.use(EXPRESS.json());

/**
 * [GET]
 * Basic route, will be replaced with a nice overview of every route
 */
const baseRoute = (req, res) => {
  res.send("Easyski API running!");
};

//-----------------
//------ROUTES-----
//-----------------

APP.use("/users", USER_ROUTER);
APP.use("/web", WEB_ROUTER);

APP.get("/", (req, res) => baseRoute(req, res));

module.exports = APP;
