import * as studentService from "../services/StudentServices.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    //returns the retrieved studensts as json
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
