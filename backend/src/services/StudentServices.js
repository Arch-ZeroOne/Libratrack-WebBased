import { query } from "../dbconfig.js";

//gets all the students

export const getAllStudents = async () => {
  //gets the returned rows
  const { rows } = await query("SELECT * FROM students");

  return rows;
};

export const deactivateStudent = async (account) => {
  const { id } = account;
  const rows = await query(
    "UPDATE students SET status = $1 WHERE student_id = $2 RETURNING *",
    ["Deactivated", id]
  );

  return rows;
};
