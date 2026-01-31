import express from "express";
import * as logController from "../controllers/LogsController.js";
const router = express.Router();

router.get("/logs", logController.logs);
router.get("/logs/filtered", logController.filterByCourse);
router.post("/logs/login", logController.logIn);

export default router;
