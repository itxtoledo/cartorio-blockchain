import jwt from "jsonwebtoken";
import express from "express";
import { User } from "../entities/User";
import { AuthError } from "./errors";
import { env } from "../env";

function getToken(req: express.Request, res: express.Response) {
  const authHeader = req.headers?.authorization || "";

  if (!authHeader) {
    throw new AuthError("no token provided", 401);
  }

  const parts = authHeader.split(" ");

  if (!(parts.length === 2)) {
    throw new AuthError("token error", 401);
  }

  const [scheme, token] = parts;

  if (scheme !== "Bearer") {
    throw new AuthError("token malformatted", 401);
  }

  try {
    return jwt.verify(token, env.JWT_SECRET) as User;
  } catch (error) {
    throw new AuthError("invalid token signature", 401);
  }
}

export const isAuthenticated =
  () =>
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.locals.user = getToken(req, res);

    return next();
  };
