exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tracks")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tracks").insert([
        { name: "2a", slope: "true" },
        { name: "2b", slope: "true" },
        { name: "2c", slope: "true" },
        { name: "2d", slope: "true" },
        { name: "Saloberjet", slope: "false" },
      ]);
    });
};
