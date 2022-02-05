exports.up = async function (KNEX) {
  return await KNEX.schema.createTable("users", (table) => {
    table.increments("id");
    table.uuid("uuid").notNullable().defaultTo(KNEX.raw("gen_random_uuid()"));
    table.string("full_name").notNullable().unique();
    table.string("password");
    table.integer("access_code");
    table.bigInteger("login_validity");
  });
};

exports.down = async function (KNEX) {
  return await KNEX.schema.dropTable("users");
};
