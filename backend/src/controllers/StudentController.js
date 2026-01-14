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

export const addNewStudent = async (req, res) => {
  try {
    const newStudent = await studentService.addNewStudent(req.body);
    res
      .status(201)
      .json({ message: "Student successfully addewd", data: newStudent });
  } catch (error) {
    console.log("Error While Adding Student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deactivateStudent = async (req, res) => {
  try {
    const deactivated = await studentService.deactivateStudent(req.params);

    res
      .status(200)
      .json({ message: "Student Account Deactivated", data: deactivated });
  } catch (error) {
    console.error("Error Deacivating Student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getStudent = async (req, res) => {
  try {
    const student = await studentService.getStudent(req.params);
    if (student) {
      res.status(200).json(student);
      return;
    }

    res.status(404).json({ message: "Not Found" });
  } catch (error) {
    console.error("Error Getting Student Specific Data:", error);
    res.statu(500).json({ error: "Internal Server Error" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await studentService.updateStudent(
      req.params.id,
      req.body
    );
    const { rows } = updatedStudent;

    if (rows.length != 0) {
      res.status(200).json(updatedStudent.rows);
    }
  } catch (error) {
    console.error("Error Updating Student Data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
