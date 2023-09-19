import express from "express";

const route = express.Router();

route.post("/register", (req, res) => {});

route.post("/login", (req, res) => {});

route.post("/lost-password", (req, res) => {});

route.post("/reset-password", (req, res) => {});

export { route as authRouter };
