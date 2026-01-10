import express from "express";
import * as studentController from "../controllers/StudentController.js";
const router = express.Router();

router.get("/students", studentController.getAllStudents);
router.patch("/students/:id", studentController.deactivateStudent);

export default router;
