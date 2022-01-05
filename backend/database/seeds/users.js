exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { full_name: "Wouter Heirstrate" },
        { full_name: "Tom Delacroix" },
        { full_name: "Agnes Greta Liesbeth Van Den Eynden" },
      ]);
    });
};
