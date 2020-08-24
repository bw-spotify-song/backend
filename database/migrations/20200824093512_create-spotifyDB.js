exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments(); // id

      tbl.text("email", 128).unique().notNullable();

      tbl.text("password", 128).notNullable();

      tbl.text("firstName", 128).notNullable();

      tbl.text("lastName", 128).notNullable();
    })
    .createTable("songs", (tbl) => {
      tbl.increments();
      tbl.text("spotifyID", 128).notNullable();

      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("songs").dropTableIfExists("users");
};
