import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export function errorMidleware(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log("opa", error);
  if (!error) {
    next();
  }

  return response.status(500).json({ message: "Somenthing broke!", error });
}
