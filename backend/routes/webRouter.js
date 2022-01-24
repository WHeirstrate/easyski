const EXPRESS = require("express");
const KNEX = require("../database/config");
const HELPER = require("./helpers/helpers");
const WEB_ROUTER = EXPRESS.Router();

const loginWithCode = async (req, res) => {
  const code = req.body.code;
  const [user, error] = await HELPER.validateUniqueCode(code);

  if (error) {
    return res.json(error).status(401);
  }
  HELPER.deleteUniqueCode(user.full_name);
  return res
    .send({
      message: "User Login Succesfull",
      data: user,
    })
    .status(200);
};

WEB_ROUTER.route("/login").post((req, res) => loginWithCode(req, res));

module.exports = WEB_ROUTER;
