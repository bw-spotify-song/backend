const server = require("../api/server");
const request = require("supertest");
const db = require("../database/dbConnection");

describe("songsRouter.js", () => {
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

  let token = "";
  let songID = "";
  let newSong = { spotifyID: "test spotify ID" };
  let updatedSong = { spotifyID: "updated spotify ID" };

  describe("GET /", () => {
    it("should return 200 status code", async () => {
      await request(server).post("/auth/register").send(newUser);
      let login = await request(server)
        .post("/auth/login")
        .send(loginCredentials);

      token = login.body.token;
      id = login.body.userID;
      let song = await request(server)
        .get(`/songs`)
        .set("Authorization", token);

      expect(song.status).toBe(200);
    });
    it("should return an array ", async () => {
      let song = await request(server)
        .get(`/songs`)
        .set("Authorization", token);

      expect(song.body).toBeTruthy();
    });
  });

  describe("GET /:user_id", () => {
    it("should return 200 status code", async () => {
      let song = await request(server)
        .get(`/songs/${id}`)
        .set("Authorization", token)
        .send(newSong);

      expect(song.status).toBe(200);
    });
    it("should return an array ", async () => {
      let song = await request(server)
        .get(`/songs/${id}`)
        .set("Authorization", token)
        .send(newSong);

      expect(song.body).toBeTruthy();
    });
  });

  describe("POST /:user_id", () => {
    it("should return 200 status code", async () => {
      let song = await request(server)
        .post(`/songs/${id}`)
        .set("Authorization", token)
        .send(newSong);

      songID = song.body.id;

      expect(song.status).toBe(201);
    });
    it("should return a spotifyID status code", async () => {
      let song = await request(server)
        .post(`/songs/${id}`)
        .set("Authorization", token)
        .send(newSong);

      expect(song.body.spotifyID).toBeTruthy();
    });
  });

  describe("PUT /:user_id/:song_id", () => {
    it("should return 200 status code", async () => {
      let song = await request(server)
        .put(`/songs/${id}/${songID}`)
        .set("Authorization", token)
        .send(updatedSong);

      expect(song.status).toBe(200);
    });
    it("should return 200 status code", async () => {
      let song = await request(server)
        .put(`/songs/${id}/${songID}`)
        .set("Authorization", token)
        .send(updatedSong);

      expect(song.body.response.spotifyID).toEqual("updated spotify ID");
    });
  });

  describe("DELETE /:user_id/:song_id", () => {
    it("should return 200 status code", async () => {
      let song = await request(server)
        .delete(`/songs/${id}/${songID}`)
        .set("Authorization", token);

      expect(song.body.message).toEqual(
        `song with ID ${songID} has been deleted`
      );
    });
  });
});
