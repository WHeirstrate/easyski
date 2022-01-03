require("dotenv").config();
const CONFIGURATION = require("./knexfile");
const KNEX = require("knex")(CONFIGURATION);

module.exports = KNEX;
