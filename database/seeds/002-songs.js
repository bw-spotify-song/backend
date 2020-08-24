exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("songs")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("songs").insert([
        {
          spotifyID: "6UBjSnyP1O5W5ndJoO9vUk",
          user_id: 1,
        },
        {
          spotifyID: "0JwtuqKYYCA1iJ5cubotGW",
          user_id: 1,
        },
        {
          spotifyID: "49fT6owWuknekShh9utsjv",
          user_id: 1,
        },
        {
          spotifyID: "30St98Bok3jJmXdkkHVPQe",
          user_id: 2,
        },
        {
          spotifyID: "0KefTgKt7yjGkKPyO7yryV",
          user_id: 2,
        },
        {
          spotifyID: "2VqKx3HH8gaZPabNWYvksy",
          user_id: 2,
        },
      ]);
    });
};
