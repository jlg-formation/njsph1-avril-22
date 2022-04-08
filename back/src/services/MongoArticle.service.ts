import { Article } from "../interfaces/Articles";
import { MongoClient, Db, Document, ObjectId } from "mongodb";

const uri = "mongodb://localhost:27017/gestion-stock";

const convert = (d: Document) => {
  const result = { ...d };
  result.id = result._id.toHexString();
  delete result._id;
  return result;
};

let db: Db;

const init = async () => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("youpi... connected to Mongo");
    db = client.db();
  } catch (err) {
    console.log("err: ", err);
    process.exit(1);
  }
};

init();

export class MongoArticleService {
  async add(article: Article): Promise<Article> {
    const result = await db.collection("articles").insertOne(article);
    console.log("result: ", result);
    const addedArticle = { ...article };
    addedArticle.id = result.insertedId.toHexString();
    return addedArticle;
  }

  async remove(ids: string[]) {
    const objects = ids.map((id) => new ObjectId(id));
    console.log("objects: ", objects);
    await db.collection("articles").deleteMany({ _id: { $in: objects } });
  }

  async retrieveAll() {
    const documents = await db.collection("articles").find({}).toArray();
    const articles = documents.map((d) => convert(d));
    console.log("articles: ", articles);
    return articles;
  }
}
