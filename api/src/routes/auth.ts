import express from "express";
import { AuthController } from "../controllers/AuthController";

const routes = express.Router();
const controller = new AuthController();

routes.post("/auth/register", controller.register);
routes.post("/auth/login", controller.login);
routes.post("/auth/lost-password", controller.lostPassword);
routes.post("/auth/reset-password", controller.resetPassword);

export { routes as authRouter };
