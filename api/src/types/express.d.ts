import "express";
import { IDI } from "./di";
import { JWTUser } from "../entities/User";

declare module "express-serve-static-core" {
  export interface Locals {
    user: JWTUser?;
    di: IDI;
  }
}
