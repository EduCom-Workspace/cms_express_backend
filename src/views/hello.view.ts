import { Request, Response } from "express";

export const helloView = (req: Request, res: Response) => {
  return res.send({
    status: 200,
    message: "Hello From Route-View Express Typescript Project",
  });
};