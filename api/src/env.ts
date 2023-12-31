import { cleanEnv, host, num, str } from "envalid";

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ["development", "test", "production", "staging"] }),

  PORT: num(),
  JWT_SECRET: str(),
  PASSWORD_SALT: num(),

  MAIL_HOST: host(),
  MAIL_PORT: num(),
  MAIL_USER: str(),
  MAIL_PASS: str(),

  DB_HOST: str(),
  DB_NAME: str(),
  DB_USER: str(),
  DB_PASS: str(),

  RPC_URL: str({
    example: "https://alfajores-forno.celo-testnet.org",
  }),

  PRIVATE_KEY: str(),

  CONTRACT: str(),
});
