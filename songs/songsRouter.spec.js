const server = require("../api/server");
const request = require("supertest");
const db = require("../database/dbConnection");

describe("songsRouter.js", () => {
  beforeEach(async () => {
    // this function executes and clears out the table before each test
    await db("songs").truncate();
  });

  it("should work", () => {
    expect(2).toBe(2);
  });
});
