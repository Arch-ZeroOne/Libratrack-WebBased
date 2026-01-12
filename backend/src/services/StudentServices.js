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

export const getStudent = async (id) => {
  const rows = await query("SELECT * FROM students WHERE id = $1 RETURNING *");

  return rows;
};

export const updateStudent = async (id) => {
  const rows = await query(
    "UPDATE students SET firstname = $1, middlename = $2, lastname = $3,email = $4,phone = $5,school_id = $6 WHERE student_id = $7 RETURNING *"
  );
};

export const deactivateStudent = async (account) => {
  const { id } = account;
  const rows = await query(
    "UPDATE students SET status = $1 WHERE student_id = $2 RETURNING *",
    ["Deactivated", id]
  );

  return rows;
};
