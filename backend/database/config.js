require("dotenv").config();
const CONFIGURATION = require("./knexfile");
const KNEX = require("knex")(CONFIGURATION);

KNEX.migrate.latest();

module.exports = KNEX;
