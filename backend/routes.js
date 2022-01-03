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

const addTable = (req, res) => {
  KNEX.schema
    .createTable("users", async function (table) {
      table.increments("id");
      table.string("name", 255).notNullable();
      table.string("email", 255);
      table.timestamps();
    })
    .then((table) => {
      res.send("Table created");
    });
};

//-----------------
//------ROUTES-----
//-----------------

APP.get("/", (req, res) => baseRoute(req, res));
APP.post("/users/addUser", (req, res) => addUser(req, res));
APP.get("/addTable", (req, res) => addTable(req, res));

module.exports = APP;
