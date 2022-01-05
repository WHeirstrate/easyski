exports.up = async function (KNEX) {
  return await KNEX.schema.createTable("users", (table) => {
    table.specificType("id", "serial");
    table
      .uuid("uuid")
      .notNullable()
      .defaultTo(KNEX.raw("gen_random_uuid()"))
      .primary();
    table.string("full_name").notNullable().unique();
  });
};

exports.down = async function (KNEX) {
  return await KNEX.schema.dropTable("users");
};
