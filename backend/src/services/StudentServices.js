import { query } from "../dbconfig.js";

//gets all the students

export const getAllStudents = async () => {
  //gets the returned rows
  const { rows } = await query("SELECT * FROM students");

  return rows;
};

export const addNewStudent = async (account) => {
  const { firstname, middlename, lastname, email, phone, schoolId } = account;
  const today = new Date();
  const { rows } = await query(
    "INSERT INTO students (firstname,middlename,lastname,email,phone,school_id,created_at,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
    [firstname, middlename, lastname, email, phone, schoolId, today, "Active"]
  );

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
