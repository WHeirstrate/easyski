const EXPRESS = require("express");
const KNEX = require("../database/config");
const HELPER = require("./helpers/helpers");
const USER_ROUTER = EXPRESS.Router();

const addUserAndLogin = async (req, res) => {
  const [name, password, is_valid] = HELPER.getNamePassword(
    req.body.name,
    req.body.password
  );
  if (!is_valid) {
    return res
      .json({
        message: "Failed To Create",
        reason: "Incomplete Data",
      })
      .status(401);
  }
  const isDuplicate = await HELPER.isDuplicateEntry(name);
  if (isDuplicate) {
    return res
      .json({
        message: "Failed To Create",
        reason: "User Already Exists",
      })
      .status(401);
  }
  const hashedPassword = await HELPER.encodePassword(password);
  KNEX("users")
    .insert({
      full_name: name,
      password: hashedPassword,
    })
    .returning("*")
    .then((user) => {
      return res
        .json({
          message: "User Created Successfully",
          data: user[0],
        })
        .status(200);
    });
};

const getAllUsers = (req, res) => {
  KNEX.select()
    .from("users")
    .then((data) => {
      return res.json(data).status(200);
    });
};

const login = async (req, res) => {
  const [name, password, is_valid] = HELPER.getNamePassword(
    req.body.name,
    req.body.password
  );
  if (!is_valid) {
    return res
      .json({
        message: "Failed To Create",
        reason: "Incomplete Data",
      })
      .status(401);
  }
  KNEX("users")
    .where({
      full_name: name,
    })
    .first()
    .then(async (user) => {
      const isCorrectPassword = await HELPER.decodePassword(
        user.password,
        password
      );
      if (isCorrectPassword) {
        return res.json(user).status(200);
      }
      return res
        .json({
          message: "Failed To Authenticate",
          reason: "Invalid Password",
        })
        .status(401);
    });
};

const addRandomCode = async (req, res) => {
  const [uuid, error] = await HELPER.validateUuid(req.body.uuid);
  if (error) {
    return res.json(error);
  }
  const random_code = await HELPER.generateUniqueCode();

  KNEX("users")
    .where("uuid", uuid)
    .update({
      // the last number '60' is the amount of time the code is valid (in seconds)
      login_validity: Math.ceil(Date.now() / 1000) + 10,
      access_code: random_code,
    })
    .returning("access_code")
    .then((code) => {
      res
        .json({
          code: code[0],
        })
        .status(200);
    });
};

USER_ROUTER.route("/add").post((req, res) => addUserAndLogin(req, res));
USER_ROUTER.route("/").get((req, res) => getAllUsers(req, res));
USER_ROUTER.route("/login").post((req, res) => login(req, res));
USER_ROUTER.route("/webLogin").put((req, res) => addRandomCode(req, res));

module.exports = USER_ROUTER;
