const server = require("../api/server");
const request = require("supertest");
const db = require("../database/dbConnection");

describe("authRouter.js", () => {
  const uniqueEmail = `name${Math.random()}@alex.com`;
  let newUser = {
    email: uniqueEmail,
    password: "password",
    firstName: "Tommy",
    lastName: "Tester",
  };

  let loginCredentials = {
    email: newUser.email,
    password: newUser.password,
  };

  let responseReceived = {};

  describe("/register", () => {
    it("should return a 201 code on account registration", async () => {
      let response = await request(server).post("/auth/register").send(newUser);

      console.log("register", response.status);

      responseReceived = response.body.data;

      expect(response.status).toBe(201);
    });

    it("should return a user object on account registration", async () => {
      expect(responseReceived.id).toBeTruthy();
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
