import { query } from "../dbconfig.js";
import * as util from "../util/utils.js";
//gets all the students

export const getAllStudents = async () => {
  //gets the returned rows
  const { rows } = await query("SELECT * FROM students");

  return rows;
};

export const addNewStudent = async (account) => {
  const { firstname, middlename, lastname, email, phone } = account;
  const schoolId = await util.generateSchoolId();
  const { rows } = await query(
    "INSERT INTO students (firstname,middlename,lastname,email,phone,school_id,created_at,status) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
    [
      firstname,
      middlename,
      lastname,
      email,
      phone,
      schoolId,
      util.getFormattedDate(),
      "Active",
    ],
  );

  return rows;
};

export const getStudent = async (params) => {
  const { id } = params;
  const { rows } = await query("SELECT * FROM students WHERE student_id = $1", [
    id,
  ]);

  return rows[0];
};

export const updateStudent = async (id, payload) => {
  const {
    firstname,
    middlename,
    lastname,
    email,
    phone,
    schoolId,
    creationDate,
    status,
  } = payload;

  const rows = await query(
    "UPDATE students SET firstname = $1, middlename = $2, lastname = $3,email = $4,phone = $5,school_id = $6 , created_at = $7 , status = $8 WHERE student_id = $9 RETURNING *",
    [
      firstname,
      middlename,
      lastname,
      email,
      phone,
      schoolId,
      creationDate,
      status,
      id,
    ],
  );

  return rows;
};

export const deactivateStudent = async (account) => {
  const { id } = account;
  const rows = await query(
    "UPDATE students SET status = $1 WHERE student_id = $2 RETURNING *",
    ["Deactivated", id],
  );

  return rows;
};
export const searchStudent = async (schoolId) => {
  const { rows } = await query("SELECT * FROM students WHERE school_id = $1", [
    schoolId,
  ]);

  return rows.length !== 0;
};
