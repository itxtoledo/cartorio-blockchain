import "express-async-errors";
import { IDI } from "../types/di";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import { handleErrors, logErrors } from "../utils/handles";
import { env } from "../env";
import { authRouter } from "../routes/auth";
import { notaryRouter } from "../routes/notary";
import { RequestContext } from "@mikro-orm/core";
import Logger from "../utils/Logger";

const logger = Logger("API");

export class API {
  public app: express.Express;
  private di: IDI;

  constructor(di: IDI) {
    this.app = express();
    this.di = di;
  }

  async start() {
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use((req, res, next) => {
      res.locals = {
        di: this.di,
        user: null,
      };
      next();
    });

    this.app.use(
      cors({
        origin: "*",
        preflightContinue: false,
        optionsSuccessStatus: 204,
      })
    );

    this.app.use((req, res, next) =>
      RequestContext.create(this.di.orm.em, next)
    );

    this.app.use("/v1", authRouter);
    this.app.use("/v1", notaryRouter);

    this.app.use(logErrors);
    this.app.use(handleErrors);

    this.app.listen(env.PORT, () => {
      logger.info(`listening port ${env.PORT}`);
    });
  }

  async stop() {}
}
