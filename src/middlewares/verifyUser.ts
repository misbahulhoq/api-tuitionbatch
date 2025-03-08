import { NextFunction, Request, Response } from "express";

const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body;
  if (user) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};

export default verifyUser;
