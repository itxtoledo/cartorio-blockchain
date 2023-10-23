import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { CustomBaseEntity } from "./CustomBaseEntity";
import { User } from "./User";

@Entity()
export class FileRegistry extends CustomBaseEntity {
  @ManyToOne(() => User)
  user!: User;

  @Property()
  hash!: string;

  @Property()
  txid!: string;
}
