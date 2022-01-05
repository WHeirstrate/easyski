const EXPRESS = require("express");
const KNEX = require("../database/config");
const USER_ROUTER = EXPRESS.Router();

const addUser = (req, res) => {
  const name = req.body.name;
  KNEX("users")
    .insert({
      full_name: name,
    })
    .returning("*")
    .then((data) => {
      return res.status(200).send(data);
    });
};

const getAllUsers = (req, res) => {
  KNEX.select()
    .from("users")
    .then((data) => {
      return res.status(200).json(data);
    });
};

const login = (req, res) => {
  const name = req.body.name;
  KNEX("users")
    .where("full_name", name)
    .select("uuid")
    .then((uuid) => {
      res.send(uuid).status(200);
    });
};

const addRandomCode = (req, res) => {
  const uuid = req.body.uuid;
  const random_code = Math.round(Math.random() * 90000) + 10000;

  KNEX("users")
    .where("uuid", uuid)
    .update({
      // the last number '300' is the amount of time the code is valid (in seconds)
      login_validity: Math.ceil(Date.now() / 1000) + 300,
      access_code: random_code,
    })
    .returning("access_code")
    .then((code) => {
      res.send(code);
    });
};

USER_ROUTER.route("/add").post((req, res) => addUser(req, res));
USER_ROUTER.route("/").get((req, res) => getAllUsers(req, res));
USER_ROUTER.route("/login").post((req, res) => login(req, res));
USER_ROUTER.route("/webLogin").put((req, res) => addRandomCode(req, res));

module.exports = USER_ROUTER;
