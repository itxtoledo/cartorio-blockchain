import { Options } from "@mikro-orm/core";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { env } from "./env";

const config: Options = {
  type: "mysql",
  host: env.DB_HOST,
  user: env.DB_USER,
  dbName: env.DB_NAME,
  password: env.DB_PASS,
  entities: ["./dist/entities"], // path to our JS entities (dist), relative to `baseDir`
  entitiesTs: ["./src/entities"], // path to our TS entities (src), relative to `baseDir`
  highlighter: new SqlHighlighter(),
  debug: false,
  allowGlobalContext: true,
  migrations: {
    path: "dist/migrations",
    pathTs: "src/migrations",
  },
};

export default config;
