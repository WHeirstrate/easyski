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
          name: "Brussels",
        },
        {
          latitude: 47.79941,
          longtitude: 13.04399,
          altitude: 2,
          name: "Kitzsteinhorn",
        },
        {
          latitude: 47.123291,
          longtitude: 10.876187,
          altitude: 2,
          name: "Tirol",
        },
        {
          latitude: 51.69025,
          longtitude: 6.43505,
          altitude: 2,
          name: "Wardt",
        },
        {
          latitude: 47.565434,
          longtitude: 10.613279,
          altitude: 2,
          name: "Salober",
        },
        {
          latitude: 47.25755,
          longtitude: 10.09197,
          altitude: 2,
          name: "Schröcken",
        },
        {
          latitude: 47.128394,
          longtitude: 10.259895,
          altitude: 2,
          name: "St Anton am Arlberg",
        },
        {
          latitude: 47.785179,
          longtitude: 17.133826,
          altitude: 2,
          name: "Sankt-Johann",
        },
      ]);
    });
};
