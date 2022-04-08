import { json, Router } from "express";
import { Article } from "./interfaces/Articles";
import { MongoArticleService } from "./services/MongoArticle.service";

const articleService = new MongoArticleService();

const app = Router();

app.use(json());

app.get("/crash", (req, res, next) => {
  (async () => {
    throw new Error("oups... crashed...");
  })();
});

app.get("/date", (req, res, next) => {
  res.json({
    date: new Date(),
  });
});

app.get("/articles", (req, res) => {
  (async () => {
    try {
      const articles = await articleService.retrieveAll();
      res.json(articles);
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  })();
});

app.post("/articles", (req, res) => {
  (async () => {
    try {
      const article: Article = req.body;
      console.log("article: ", article);
      const addedArticle = await articleService.add(article);

      res.status(201).json(addedArticle);
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  })();
});

app.delete("/articles", (req, res) => {
  (async () => {
    try {
      const ids: string[] = req.body;
      console.log("ids: ", ids);

      await articleService.remove(ids);

      res.status(204).end();
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  })();
});

export const api = app;
