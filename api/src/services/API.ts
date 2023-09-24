import express from "express";
import { authRouter } from "../routes/auth";
import { env } from "../env";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { registryRouter } from "../routes/registrar";

export class API {
  private app: express.Express;

  constructor() {
    this.app = express();
  }

  start(): void {
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    this.app.use(
      cors({
        origin: "*",
        preflightContinue: false,
        optionsSuccessStatus: 204,
      })
    );

    this.app.use("/auth", authRouter);
    this.app.use("/notary", registryRouter);
    this.app.listen(env.PORT, () => {
      console.log(`Server started...`);
    });
  }

  stop() {
    this.app.removeAllListeners();
  }
}
