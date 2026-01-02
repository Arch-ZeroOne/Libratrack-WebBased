import { query } from "../dbconfig.js";

export const getAllAccounts = async () => {
  //gets the returned rows
  const { rows } = await query("SELECT * FROM student_accounts");

  return rows;
};

export const registerAccount = async (account) => {
  const {
    username,
    email,
    password,
    phone,
    school_id,
    verified_at,
    created_at,
  } = account;

  const rows = await query(
    "INSERT INTO student_accounts (username,email,password,phone,school_id,verified_at,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
    [username, email, password, phone, school_id, verified_at, created_at]
  );

  return rows;
};
