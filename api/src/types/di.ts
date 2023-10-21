import type {
  EntityManager,
  EntityRepository,
  MikroORM,
  Transaction,
} from "@mikro-orm/core";
import { User } from "../entities/User";
import { API } from "../services/API";
import { BlockchainService } from "../services/BlockchainService";
import { PasswordResetToken } from "../entities/PasswordResetToken";
import { EmailService } from "../services/EmailService";

export interface IDI {
  API: API;
  orm: MikroORM;
  em: EntityManager;

  emailService: EmailService;
  blockchainService: BlockchainService;

  // entities
  userRepository: EntityRepository<User>;
  passwordResetTokenRepository: EntityRepository<PasswordResetToken>;
}
