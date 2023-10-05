import { MikroORM } from "@mikro-orm/mysql";
import { API } from "./services/API";
import { BlockchainService } from "./services/BlockchainService";
import { IDI } from "./types/di";

export const DI = {} as IDI;

const main = async () => {
  DI.orm = await MikroORM.init(); // CLI config will be used automatically
  await DI.orm.getMigrator().up();
  DI.em = DI.orm.em;

  DI.blockchainService = new BlockchainService();
  DI.API = new API(DI);

  DI.API.start();
};

main();
