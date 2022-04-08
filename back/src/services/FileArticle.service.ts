import { Article } from "../interfaces/Articles";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import { BehaviorSubject, debounceTime } from "rxjs";

const JSON_FILE = "data/articles.json";

const articles$ = new BehaviorSubject<Article[]>([]);

const init = () => {
  try {
    const str = fs.readFileSync(JSON_FILE, { encoding: "utf-8" });
    articles$.next(JSON.parse(str));
  } catch (err) {
    console.log("err: ", err);
    articles$.next([
      { id: "12", name: "Tondeuse", price: 120, qty: 9 },
      { id: "15", name: "Marteau", price: 11, qty: 45 },
    ]);
  }

  articles$.pipe(debounceTime(5000)).subscribe({
    next: (articles) => {
      fs.promises.writeFile(JSON_FILE, JSON.stringify(articles, null, 2));
    },
  });
};

init();

export class FileArticleService {
  async add(article: Article): Promise<Article> {
    const addedArticle = { ...article };
    addedArticle.id = uuidv4();
    articles$.next([...articles$.value, addedArticle]);
    return addedArticle;
  }

  async remove(ids: string[]) {
    const remainingArticles = articles$.value.filter(
      (a) => !ids.includes(a.id)
    );
    articles$.next(remainingArticles);
  }

  async retrieveAll() {
    return articles$.value;
  }
}
