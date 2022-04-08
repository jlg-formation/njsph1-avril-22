import assert from "assert";
import { WebServer } from "../src/WebServer";
import axios from "axios";

process.env.PORT = "3232";

describe("Server", function () {
  const server = new WebServer();
  server.on("webserver-on", () => {
    console.log("webserver on");
  });

  beforeEach(async () => {
    await server.start();
  });
  afterEach(async () => {
    await server.stop();
  });

  it("should start and stop", async () => {
    const result = await axios.get("http://localhost:3232/api/date");
    console.log("result: ", result.data);
    assert.ok(result.data.date);
  });
  it("should start and stop", async () => {
    const result = await axios.get("http://localhost:3232/api/date");
    console.log("result: ", result.data);
    assert.ok(result.data.date);
  });
});
