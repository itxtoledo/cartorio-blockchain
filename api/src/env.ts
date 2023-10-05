import { cleanEnv, host, num, str } from "envalid";

export const env = cleanEnv(process.env, {
  RPC_URL: str({
    example: "https://forno.celo.org",
  }),

  CONTRACT: str(),

  PORT: num(),

  MAIL_HOST: host(),
  MAIL_PORT: num(),
  MAIL_USER: str(),
  MAIL_PASS: str(),
});
