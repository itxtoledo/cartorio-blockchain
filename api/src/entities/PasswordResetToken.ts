import { Entity, Property, ManyToOne, Unique } from "@mikro-orm/core";
import { User } from "./User";
import crypto from "crypto";
import { addMinutes } from "date-fns";

@Entity()
@Unique({ properties: ["token"] })
export class PasswordResetToken {
  @Property()
  token?: string = crypto.randomBytes(6).toString("hex");

  @Property()
  used?: boolean = false;

  @Property()
  expiresIn?: Date = addMinutes(new Date(), 10);

  @ManyToOne(() => User)
  user!: User;

  @Property()
  createdAt?: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
