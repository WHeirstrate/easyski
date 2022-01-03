/**
 * Creates the 'users' table in the passed MySQL instance (database).
 *
 * @param {*} KNEX A MySQL2 instance.
 */

const createUsersTable = async (KNEX) => {
  try {
    KNEX.schema.withSchema("public").createTable("users", (tbl) => {
      tbl.increments("id").primary();
      tbl.uuid("uuid").defaultTo(PG.raw("gen_random_uuid()")).notNullable();
      //.references("id")
      //.inTable("organisations")
      //.onDelete("RESTRICT");
      tbl.string("name").notNullable().unique();
      tbl.timestamps();
    });
    console.log("users table created");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = {
  createUsersTable,
};
