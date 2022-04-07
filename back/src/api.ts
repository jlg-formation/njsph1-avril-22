import { Router } from "express";
import { Article } from "./interfaces/Articles";

const articles: Article[] = [
  { id: "12", name: "Tondeuse", price: 120, qty: 9 },
  { id: "12", name: "Marteau", price: 11, qty: 45 },
];

const app = Router();

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
  res.json(articles);
});

export const api = app;
