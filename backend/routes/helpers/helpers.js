const KNEX = require("../../database/config");
const BCRYPT = require("bcrypt");

function getNamePassword(name, password) {
  const trimmedName = name.trim();
  const trimmedPassword = password.trim();

  if (trimmedName && trimmedPassword) {
    return [trimmedName, trimmedPassword, true];
  }
  return [null, null, false];
}

async function validateUuid(uuid) {
  KNEX("users")
    .where("uuid", uuid)
    .first()
    .then((user) => {
      console.log("user", user);
      if (user) {
        return [user.uuid, undefined];
      }
      return [
        undefined,
        {
          message: "Failed To Add Code",
          reason: "No User With This UUID",
        },
      ];
    });
}

function isDuplicateEntry(name) {
  return KNEX("users")
    .where("full_name", name)
    .first()
    .then((result) => {
      if (result) {
        return true;
      }
      return false;
    });
}

function generateUniqueCode() {
  const code = Math.round(Math.random() * 90000) + 10000;
  return KNEX("users")
    .where("access_code", code)
    .select()
    .then((result) => {
      if (result.length === 0) {
        return code;
      }
      generateUniqueCode();
    });
}

function validateUniqueCode(code) {
  return KNEX("users")
    .where("access_code", code)
    .first()
    .then((user) => {
      if (!user) {
        return [
          undefined,
          {
            message: "Failed To Authenticate",
            reason: "Incorrect Code",
          },
        ];
      }
      if (user.login_validity >= Math.ceil(Date.now() / 1000))
        return [user, undefined];
      return [
        undefined,
        {
          message: "Failed To Authenticate",
          reason: "Time Limit Exceeded",
        },
      ];
    });
}

async function encodePassword(pass) {
  const hash = await BCRYPT.hash(pass, 10);
  return hash;
}

async function decodePassword(hash, pass) {
  const result = await BCRYPT.compare(pass, hash);
  return result;
}

async function deleteUniqueCode(name) {
  return await KNEX("users")
    .where("full_name", name)
    .update({
      login_validity: null,
      access_code: null,
    })
    .then(() => {
      return true;
    });
}

module.exports = {
  getNamePassword,
  validateUuid,
  isDuplicateEntry,
  generateUniqueCode,
  validateUniqueCode,
  deleteUniqueCode,
  encodePassword,
  decodePassword,
};
