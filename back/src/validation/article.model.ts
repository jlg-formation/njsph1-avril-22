import { object, optional, string, number, array } from "superstruct";

export const ArticleCreateModel = object({
  id: optional(string()),
  name: string(),
  price: number(),
  qty: number(),
});

export const ArticleDeleteModel = array(string());
