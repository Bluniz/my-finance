import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMidleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (!request.headers["authorization"])
    return response
      .status(401)
      .json({ message: "Missing authorization token!" });

  try {
    const token = request.headers["authorization"]?.split(" ")[1];

    const decodedToken = jwt.verify(
      token,
      process.env.SUPABASE_JWT_SECRET || ""
    );

    if (!!decodedToken) next();
  } catch (error) {
    return response.status(401).json(error);
  }
}
