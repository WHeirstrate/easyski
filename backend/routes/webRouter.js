const EXPRESS = require("express");
const KNEX = require("../database/config");
const HELPER = require("./helpers/helpers");
const WEB_ROUTER = EXPRESS.Router();

const loginWithCode = async (req, res) => {
  const code = req.body.code;
  const user = await HELPER.validateUniqueCode(code);
  //
  // if code has no user, then return json with said message
  //
  if (!user) {
    return res
      .json({
        message: "Failed To Authenticate",
        reason: "Time Limit Exceeded",
      })
      .status(401);
  }
  HELPER.deleteUniqueCode(user.full_name);
  return res.send(user).status(200);
};

WEB_ROUTER.route("/login").post((req, res) => loginWithCode(req, res));

module.exports = WEB_ROUTER;
