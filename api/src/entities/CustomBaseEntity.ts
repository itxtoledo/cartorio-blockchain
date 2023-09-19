import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity({ abstract: true })
export abstract class CustomBaseEntity {
  @PrimaryKey({
    columnType: "int(11)",
    unsigned: false,
  })
  id!: number;

  @Property({
    name: "createdAt",
    type: "datetime",
    columnType: "datetime",
  })
  createdAt?: Date = new Date();

  @Property({
    name: "updatedAt",
    type: "datetime",
    columnType: "datetime",
    onUpdate: () => new Date(),
  })
  updatedAt?: Date = new Date();
}
