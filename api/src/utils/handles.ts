import express from "express";

export function handleMessage(data: any, res: express.Response, message = "") {
  return res.json(data);
}

export function logErrors(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (err.code !== 401)
    console.error(
      req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      err
    );
  next(err);
}

export function handleErrors(
  err: any,
  req: express.Request,
  res: express.Response,
  next?: express.NextFunction
) {
  return res.status(err.code || 500).send({
    message: err.message || err,
  });
}
