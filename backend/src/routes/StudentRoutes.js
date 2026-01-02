import express from "express";
import * as studentController from "../controllers/StudentController.js";
const router = express.Router();

router.get("/students", studentController.getAllStudents);

export default router;
