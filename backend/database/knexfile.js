//const CONNECTION_STRING = process.env.PG_CONNECTION_STRING;
require("dotenv").config();

module.exports = {
  client: "pg",
  connection: process.env.PG_CONNECTION_STRING
    ? process.env.PG_CONNECTION_STRING
    : {
        host: "127.0.0.1",
        port: 5432,
        user: "user",
        password: "password",
        database: "database",
      },
  searchPath: ["knex", "public"],
};
