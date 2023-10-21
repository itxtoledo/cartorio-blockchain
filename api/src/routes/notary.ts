import express from "express";
import { NotaryController } from "../controllers/NotaryController";
import { isAuthenticated } from "../utils/Permissions";

const routes = express.Router();

const controller = new NotaryController();

routes.post("/notary/register", isAuthenticated(), (req, res) =>
  controller.registerDocument(req, res)
);
routes.post("/notary/check", (req, res) => controller.checkDocument(req, res));
routes.get("/notary/:hash", (req, res) =>
  controller.getDocumentDetails(req, res)
);

export { routes as notaryRouter };
