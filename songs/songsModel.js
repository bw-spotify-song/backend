const db = require("../database/dbConnection.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  findByUserId,
  update,
  remove,
};

function find() {
  return db("songs").orderBy("id");
}

async function add(song) {
  try {
    const [id] = await db("songs").insert(song, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function findBy(filter) {
  return db("songs").where(filter).orderBy("id");
}

function findById(id) {
  return db("songs").where({ id }).first();
}

function findByUserId(id) {
  return db("songs").where({ user_id: id }).orderBy("id");
}

function update(id, changes) {
  return db("songs")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db("songs").where({ id }).del();
}
