import express from "express";
import * as studentController from "../controllers/StudentController.js";
const router = express.Router();

router.get("/students", studentController.getAllStudents);
router.get("/students/:id", studentController.getStudent);
router.post("/students", studentController.addNewStudent);
router.patch("/students/ban/:id", studentController.banStudent);
router.patch("/students/activate/:id", studentController.activateStudent);
router.patch("/students/deactivate/:id", studentController.deactivateStudent);
router.patch("/students/update/:id", studentController.updateStudent);

export default router;
