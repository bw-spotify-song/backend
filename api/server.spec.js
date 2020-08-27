const server = require("./server");
const request = require("supertest");

describe("server.js", () => {
  it("server should return 200 status code", async () => {
    let response = await request(server).get("/");

    expect(response.status).toBe(200);
  });

  it("server should return json object", async () => {
    let response = await request(server).get("/");

    let expectedResponse = { message: "server running :)" };

    expect(response.body).toEqual(expectedResponse);
  });
});
