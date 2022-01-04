exports.up = function (KNEX) {
  return KNEX.schema.createTable("point_track", async (table) => {
    table.integer("point_id");
    table.integer("track_id");
  });
};

exports.down = function (KNEX) {
  return KNEX.schema.dropTable("point_track");
};
