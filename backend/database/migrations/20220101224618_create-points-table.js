exports.up = async function (KNEX) {
  return await KNEX.schema.createTable("points", async (table) => {
    table.increments("id");
    table.uuid("uuid").defaultTo(KNEX.raw("gen_random_uuid()")).notNullable();
    table.integer("area_id").defaultTo(1).notNullable();
    table.double("latitude").notNullable();
    table.double("longtitude").notNullable();
    table.double("altitude").notNullable();
    table.boolean("main_point").defaultTo(true).notNullable();
    table.string("name", 255);
    table.timestamps(true, true);
  });
};

exports.down = async (KNEX) => {
  return await KNEX.schema.dropTable("points");
};
