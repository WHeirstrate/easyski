exports.up = async function (KNEX) {
  return await KNEX.schema.createTable("users", async function (table) {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.string("email", 255);
    table.timestamps();
  });
};

exports.down = async function (KNEX) {
  return await KNEX.schema.dropTable("users");
};
