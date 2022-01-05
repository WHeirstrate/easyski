const EXPRESS = require("express");
const KNEX = require("../database/config");
const WEB_ROUTER = EXPRESS.Router();

async function codeCheck(code) {
  return KNEX("users")
    .where("access_code", code)
    .first()
    .then((user) => {
      console.log("user", user);
      console.log("validity", user.login_validity);
      if (user.login_validity >= Math.ceil(Date.now() / 1000)) return user;
      return undefined;
    });
}

const loginWithCode = (req, res) => {
  const code = req.body.code;
  return codeCheck(code).then((user) => {
    console.log("user", user);
    if (!user) {
      return res
        .json({
          message: "Authentication Failed",
        })
        .status(401);
    }
    return res.send(user).status(200);
  });
};

WEB_ROUTER.route("/login").post((req, res) => loginWithCode(req, res));

module.exports = WEB_ROUTER;
