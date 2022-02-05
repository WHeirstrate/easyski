exports.up = async function (KNEX) {
  return await KNEX.schema.createTable("point_track", async (table) => {
    table.increments("id");
    table
      .integer("point_id")
      .notNullable()
      .references("id")
      .inTable("points")
      .onDelete("RESTRICT");
    table
      .integer("track_id")
      .notNullable()
      .references("id")
      .inTable("tracks")
      .onDelete("RESTRICT");
  });
};

exports.down = function (KNEX) {
  return KNEX.schema.dropTable("point_track");
};
