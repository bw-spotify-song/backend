const server = require("../api/server");
const request = require("supertest");
const db = require("../database/dbConnection");

describe("usersRouter.js", () => {
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

  let token = "";
  let id = "";

  beforeEach(async () => {
    // this function executes and clears out the table before each test
    await db("users").truncate();
    await request(server).post("/auth/register").send(newUser);
    let login = await request(server)
      .post("/auth/login")
      .send(loginCredentials);

    token = login.body.token;
    id = login.body.userID;
  });

  describe("/", () => {
    it("should return a status of 200", async () => {
      let response = await request(server)
        .get("/users")
        .set("Authorization", token);

      expect(response.status).toBe(200);
    });

    it("should return an array of users", async () => {
      let response = await request(server)
        .get("/users")
        .set("Authorization", token);

      expect(response.body).toHaveLength(1);
    });
  });

  describe("/:user_id", () => {
    it("should return a status of 200", async () => {
      let response = await request(server)
        .get(`/users/${id}`)
        .set("Authorization", token);

      expect(response.status).toBe(200);
    });

    it("should return an array of users", async () => {
      let response = await request(server)
        .get(`/users/${id}`)
        .set("Authorization", token);

      expect(response.body.firstName).toEqual("Tommy");
    });
  });

  describe("GET /:user_id", () => {
    it("should return a status of 200", async () => {
      let response = await request(server)
        .get(`/users/${id}`)
        .set("Authorization", token);

      expect(response.status).toBe(200);
    });

    it("should return an array of users", async () => {
      let response = await request(server)
        .get(`/users/${id}`)
        .set("Authorization", token);

      expect(response.body.firstName).toEqual("Tommy");
    });
  });

  describe("DELETE /:user_id", () => {
    it("should return a status of 200", async () => {
      let response = await request(server)
        .delete(`/users/${id}`)
        .set("Authorization", token);

      expect(response.status).toBe(200);
    });

    it("should return an array of users", async () => {
      let response = await request(server)
        .delete(`/users/${id}`)
        .set("Authorization", token);

      expect(response.body.message).toEqual(
        `User with ID ${id} has been deleted`
      );
    });
  });

  describe("PUT /:user_id", () => {
    let updatedUser = {
      email: "req.body.email",
      password: "req.body.password",
      firstName: "req.body.firstName",
      lastName: "req.body.lastName",
    };

    it("should return a status of 200", async () => {
      let response = await request(server)
        .put(`/users/${id}`)
        .send(updatedUser)
        .set("Authorization", token);

      expect(response.status).toBe(200);
    });

    it("should return an array of users", async () => {
      let response = await request(server)
        .put(`/users/${id}`)
        .send(updatedUser)
        .set("Authorization", token);

      expect(response.body.data).toBeTruthy();
    });
  });
});
