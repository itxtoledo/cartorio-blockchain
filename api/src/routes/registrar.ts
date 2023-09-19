import express from "express";

const route = express.Router();

route.post("/documments", (req, res) => {});

route.get("/documments/:hash", (req, res) => {});

export { route as registryRouter };
