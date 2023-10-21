import { MikroORM } from "@mikro-orm/mysql";
import { API } from "./services/API";
import { BlockchainService } from "./services/BlockchainService";
import { IDI } from "./types/di";
import { EmailService } from "./services/EmailService";
import { User } from "./entities/User";
import { PasswordResetToken } from "./entities/PasswordResetToken";

export const DI = {} as IDI;

const main = async () => {
  DI.orm = await MikroORM.init(); // CLI config will be used automatically
  await DI.orm.getMigrator().up();
  DI.em = DI.orm.em;

  // entities
  DI.userRepository = DI.orm.em.getRepository(User);
  DI.passwordResetTokenRepository = DI.orm.em.getRepository(PasswordResetToken);

  // services
  DI.emailService = new EmailService();
  DI.blockchainService = new BlockchainService();
  DI.API = new API(DI);
  DI.API.start();
};

main();
