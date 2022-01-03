const EXPRESS = require("express");
const APP = EXPRESS();
const KNEX = require("./database/config");

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

const addUser = (req, res) => {
  KNEX("users")
    .insert({
      name: req.body.name,
    })
    .returning("*")
    .then((data) => {
      return res.status(200).send(data);
    });
};

//const addTable = (req, res) => {
//  KNEX.
//}

//-----------------
//------ROUTES-----
//-----------------

APP.get("/", (req, res) => baseRoute(req, res));
APP.post("/users/addUser", (req, res) => addUser(req, res));

module.exports = APP;
