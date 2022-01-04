exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("points")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("points").insert([
        {
          latitude: 50.85045,
          longtitude: 4.34878,
          altitude: 2,
          name: "Kitzsteinhorn",
        },
      ]);
    });
};
