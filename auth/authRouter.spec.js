const server = require("../api/server");
const request = require("supertest");
const db = require("../database/dbConnection");

describe("authRouter.js", () => {
  beforeEach(async () => {
    // this function executes and clears out the table before each test
    await db("users").truncate();
  });

  let newUser = {
    email: "tommy@tester.com",
    password: "password",
    firstName: "Tommy",
    lastName: "Tester",
  };

  let loginCredentials = {
    email: newUser.email,
    password: newUser.password,
  };

  describe("/register", () => {
    it("should return a 201 code on account registration", async () => {
      let response = await request(server).post("/auth/register").send(newUser);

      expect(response.status).toBe(201);
    });

    it("should return a user object on account registration", async () => {
      let response = await request(server).post("/auth/register").send(newUser);

      expect(response.body.data.id).toBeTruthy();
    });
  });

  describe("/login", () => {
    it("should return a 200 code on log in", async () => {
      let register = await request(server).post("/auth/register").send(newUser);

      let login = await request(server)
        .post("/auth/login")
        .send(loginCredentials);

      expect(login.status).toBe(200);
    });

    it("should return a user token on log in", async () => {
      let register = await request(server).post("/auth/register").send(newUser);
      let login = await request(server)
        .post("/auth/login")
        .send(loginCredentials);

      expect(login.body.token).toBeTruthy();
    });
  });
});
