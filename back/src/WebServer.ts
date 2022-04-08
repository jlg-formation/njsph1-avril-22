import cors from "cors";
import EventEmitter from "events";
import express, { Express } from "express";
import { createServer, Server } from "http";
import serveIndex from "serve-index";
import { api } from "./api";

export class WebServer extends EventEmitter {
  server: Server;
  port = +process.env.PORT || 3000;

  constructor() {
    super();
    const app = express();

    const wwwDir = "public";

    app.use((req, res, next) => {
      console.log("req: ", req.url);
      next();
    });

    app.use(cors());

    app.use("/api", api);

    app.use(express.static(wwwDir));
    app.use(serveIndex(wwwDir, { icons: true }));

    this.server = createServer(app);
  }

  start() {
    return new Promise<void>((resolve, reject) => {
      this.server.once("error", (err) => {
        reject(err);
      });
      this.server.listen(this.port, () => {
        console.log(`Example app listening on port ${this.port}`);
        this.emit("webserver-on");
        resolve();
      });
    });
  }

  stop() {
    return new Promise<void>((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          console.log("err: ", err);
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
}
