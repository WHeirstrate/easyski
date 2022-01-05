require("dotenv").config();
const CONFIGURATION = require("./knexfile");
const MODEL = require("objection").Model;
const KNEX = require("knex")(CONFIGURATION);

MODEL.knex(KNEX);

module.exports = KNEX;
