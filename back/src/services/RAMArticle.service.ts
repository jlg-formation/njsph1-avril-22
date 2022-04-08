import { Article } from "../interfaces/Articles";
import { v4 as uuidv4 } from "uuid";

let articles: Article[] = [
  { id: "12", name: "Tondeuse", price: 120, qty: 9 },
  { id: "15", name: "Marteau", price: 11, qty: 45 },
];

export class RAMArticleService {
  async add(article: Article): Promise<Article> {
    const addedArticle = { ...article };
    addedArticle.id = uuidv4();
    articles.push(addedArticle);
    return addedArticle;
  }

  remove(ids: string[]) {
    articles = articles.filter((a) => !ids.includes(a.id));
  }

  async retrieveAll() {
    return articles;
  }
}
