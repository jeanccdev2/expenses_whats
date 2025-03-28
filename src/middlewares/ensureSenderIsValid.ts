import { NextFunction, Request, Response } from "express";

export class EnsureSender {
  static isValid(req: Request, res: Response, next: NextFunction) {
    try {
      const { sender } = req.body;

      if (!sender.includes("98465757")) {
        res.status(403).json({ message: "Sender inválido" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(403).json({ message: "Sender inválido" });
    }
  }
}
