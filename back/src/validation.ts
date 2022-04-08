import { NextFunction, Request, Response } from "express";
import { assert, Struct } from "superstruct";

export const validation =
  (model: Struct) => (req: Request, res: Response, next: NextFunction) => {
    try {
      assert(req.body, model);
      next();
    } catch (err) {
      const message = err.message;
      res.status(400).json({ error: message });
    }
  };
