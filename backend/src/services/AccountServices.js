import { query } from "../dbconfig.js";

export const getAllAccounts = async () => {
  //gets the returned rows
  const { rows } = await query("SELECT * FROM student_accounts");

  return rows;
};

export const registerAccount = async (account) => {
  const verified_at = null;
  const created_at = new Date();
  const { username, email, password, phone, school_id } = account;

  const rows = await query(
    "INSERT INTO student_accounts (username,email,password,phone,school_id,verified_at,created_at) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
    [username, email, password, phone, school_id, verified_at, created_at]
  );

  return rows;
};

export const handleLogin = async (account) => {
  const { email, password } = account;

  const rows = await query(
    "SELECT * FROM student_accounts WHERE email = $1 OR username = $1 AND password = $2",
    [email, password]
  );
  return rows;
};
