exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          email: "admin@admin.com",
          password: "password",
          firstName: "Ad",
          lastName: "Ministrator",
        },
        {
          email: "alex@alex.com",
          password: "password",
          firstName: "Alex",
          lastName: "Kemper",
        },
      ]);
    });
};
