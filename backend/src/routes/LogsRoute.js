import express from "express";
import * as logController from "../controllers/LogsController.js";
const router = express.Router();

router.get("/logs", logController.logs);
router.post("/logs/login", logController.logIn);
router.patch("/logs/logout/:id", logController.logOut);

export default router;
