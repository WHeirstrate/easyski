const HELPER = require("../../routes/helpers/helpers");
exports.seed = async function (knex) {
  const hashedPassword = await HELPER.encodePassword("testuser");
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { full_name: "Wouter Heirstrate", password: hashedPassword },
        { full_name: "Tom Delacroix", password: hashedPassword },
        {
          full_name: "Agnes Greta Liesbeth Van Den Eynden",
          password: hashedPassword,
        },
      ]);
    });
};
