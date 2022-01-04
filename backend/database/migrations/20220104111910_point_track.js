exports.up = function (KNEX) {
  return KNEX.schema.createTable("point_track", async (table) => {
    table
      .uuid("point_uuid")
      .notNullable()
      .references("uuid")
      .inTable("points")
      .onDelete("RESTRICT");
    table
      .uuid("track_uuid")
      .notNullable()
      .references("uuid")
      .inTable("tracks")
      .onDelete("RESTRICT");
  });
};

exports.down = function (KNEX) {
  return KNEX.schema.dropTable("point_track");
};
