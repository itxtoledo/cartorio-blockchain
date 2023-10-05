import express from "express";
import { RegistrarController } from "../controllers/RegistrarController";

const route = express.Router();

const controller = new RegistrarController();

route.post("/register", controller.registerDocument);
route.post("/check", controller.checkDocument);
route.get("/:hash", controller.getDocumentDetails);

export { route as registryRouter };
