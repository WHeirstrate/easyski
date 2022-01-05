exports.up = async function (KNEX) {
  return await KNEX.schema.createTable("users", (table) => {
    table.increments("id");
    table.uuid("uuid").notNullable().defaultTo(KNEX.raw("gen_random_uuid()"));
    table.string("full_name").notNullable().unique();
  });
};

exports.down = async function (KNEX) {
  return await KNEX.schema.dropTable("users");
};
