import jwt from "jsonwebtoken";
import { Request } from "express";

export function verifyToken(request: Request) {
  if (!request.headers["authorization"]) return;

  const token = request.headers["authorization"]?.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SUPABASE_JWT_SECRET || "");

  return decodedToken;
}
