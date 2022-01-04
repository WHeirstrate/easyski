exports.up = async function (KNEX) {
  return await KNEX.schema.createTable("points", async (table) => {
    //table.primary(["id", "uuid"]);
    //table.increments("id");
    table.specificType("id", "serial");
    table
      .uuid("uuid")
      .notNullable()
      .defaultTo(KNEX.raw("gen_random_uuid()"))
      .primary();
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
