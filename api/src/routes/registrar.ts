import express from "express";
import { RegistrarController } from "../controllers/RegistrarController";
import { isAuthenticated } from "../utils/Permissions";

const route = express.Router();

const controller = new RegistrarController();

route.post("/register", isAuthenticated(), controller.registerDocument);
route.post("/check", controller.checkDocument);
route.get("/:hash", controller.getDocumentDetails);

export { route as registryRouter };
