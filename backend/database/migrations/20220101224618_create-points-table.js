exports.up = async function (KNEX) {
  return await KNEX.schema.createTable("points", async (table) => {
    table.increments("id");
    table.uuid("uuid").defaultTo(KNEX.raw("gen_random_uuid()"));
    table.integer("area_id").defaultTo(1);
    table.double("latitude");
    table.double("longtitude");
    table.double("altitude");
    table.boolean("main_point").defaultTo(true);
    table.string("name", 255);
    table.timestamps(true, true);
  });
};

exports.down = async (KNEX) => {
  return await KNEX.schema.dropTable("points");
};
