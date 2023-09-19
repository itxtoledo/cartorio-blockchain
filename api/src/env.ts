import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  RPC_URL: str({
    example: "https://forno.celo.org",
  }),
});
