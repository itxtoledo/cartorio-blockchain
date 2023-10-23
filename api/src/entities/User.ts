import {
  Entity,
  Property,
  OneToMany,
  Collection,
  ManyToMany,
  ManyToOne,
} from "@mikro-orm/core";
import { CustomBaseEntity } from "./CustomBaseEntity";
import { FileRegistry } from "./FileRegistry";

@Entity()
export class User extends CustomBaseEntity {
  @Property()
  name!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @OneToMany(() => FileRegistry, (file) => file.user)
  files = new Collection<FileRegistry>(this);

  constructor(name: string, email: string, password: string) {
    super();
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
