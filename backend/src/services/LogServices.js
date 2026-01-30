import { query } from "../dbconfig.js";
import * as util from "../util/utils.js";
import { searchStudent } from "./StudentServices.js";

export const logs = async () => {
  const { rows } = await query("SELECT * FROM logs");

  return rows;
};
export const logIn = async (params) => {
  const { id } = params;

  const existing = await searchStudent(id);
  console.log(`Student Exists: ${existing}`);
  if (!existing) {
    console.log("Not Existing");
    return [];
  }

  //Check active sessions (Not logged out user)
  const { rows: active } = await query(
    "SELECT * FROM logs WHERE school_id = $1 AND time_out IS NULL",
    [id],
  );

  console.log("Active Session Length:", active.length);

  if (active.length > 0) {
    await logOut(id);

    //Prevent default logging in
    return true;
  }

  //Logs in new logged user
  const { rows } = await query(
    "INSERT INTO logs (school_id,time_in,date_logged) VALUES ($1,$2,$3) RETURNING *",
    [id, util.getFormattedTime(), util.getFormattedDate()],
  );

  return rows;
};

export const logOut = async (school_id) => {
  const { rows } = await query(
    "UPDATE logs SET time_out = $1 WHERE time_out IS NULL AND school_id = $2  RETURNING *",
    [util.getFormattedTime(), school_id],
  );

  return rows;
};
