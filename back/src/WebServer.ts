import cors from "cors";
import express, { Express } from "express";
import { createServer, Server } from "http";
import serveIndex from "serve-index";
import { api } from "./api";

export class WebServer {
  server: Server;
  port = +process.env.PORT || 3000;

  constructor() {
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
