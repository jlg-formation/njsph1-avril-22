import express from "express";
import serveIndex from "serve-index";

console.log("About to start the server...");

const app = express();
const port = +process.env.PORT || 3000;
const wwwDir = ".";

app.use((req, res, next) => {
  console.log("req: ", req.url);
  next();
});

app.get("/api/crash", (req, res, next) => {
  (async () => {
    throw new Error("oups... crashed...");
  })();
});

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
