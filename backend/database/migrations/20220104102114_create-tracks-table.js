exports.up = async function (KNEX) {
  return await KNEX.schema.createTable("tracks", async (table) => {
    table.increments("id");
    table.uuid("uuid").defaultTo(KNEX.raw("gen_random_uuid()"));
    table.integer("tracktype_id").defaultTo(1);
    table.string("name");
    table.boolean("slope").defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = async (KNEX) => {
  return await KNEX.schema.dropTable("tracks");
};
