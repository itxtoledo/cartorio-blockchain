import type {
  EntityManager,
  EntityRepository,
  MikroORM,
  Transaction,
} from "@mikro-orm/core";
import { User } from "../entities/User";
import { API } from "../services/API";
import { BlockchainService } from "../services/BlockchainService";

export interface IDI {
  API: API;
  orm: MikroORM;
  em: EntityManager;

  blockchainService: BlockchainService;

  // entities
  userRepository: EntityRepository<User>;
}
