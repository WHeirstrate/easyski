exports.up = async function (KNEX) {
  return await KNEX.schema.createTable("tracks", async (table) => {
    //table.primary(["id", "uuid"]);
    //table.increments("id");
    table.increments("id");
    table.uuid("uuid").notNullable().defaultTo(KNEX.raw("gen_random_uuid()"));
    table.integer("tracktype_id").defaultTo(1).notNullable();
    table.string("name").notNullable();
    table.boolean("slope").defaultTo(true).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async (KNEX) => {
  return await KNEX.schema.dropTable("tracks");
};
