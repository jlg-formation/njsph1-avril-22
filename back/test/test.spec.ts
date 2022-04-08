import assert from "assert";
import { WebServer } from "../src/WebServer";
describe("Server", function () {
  it("should start and stop", async () => {
    process.env.PORT = "3232";
    const server = new WebServer();
    server.on("webserver-on", () => {
      console.log("webserver on");
    });
    await server.start();
    await server.stop();
  });
});
