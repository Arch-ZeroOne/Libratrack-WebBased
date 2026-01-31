import { query } from "../dbconfig.js";
import * as util from "../util/utils.js";
import { searchStudent } from "./StudentServices.js";

export const logs = async () => {
  const { rows } = await query("SELECT * FROM logs");

  return rows;
};
export const logIn = async (params) => {
  const { id } = params;
  const course = await util.getCourse(id);
  const existing = await searchStudent(id);

  if (!existing) {
    return [];
  }

  //Check active sessions (Not logged out user)
  const { rows: active } = await query(
    "SELECT * FROM logs WHERE school_id = $1 AND time_out IS NULL",
    [id],
  );

  if (active.length > 0) {
    const rows = await logOut(id);

    //Prevent default logging in
    return rows[0];
  }

  //Logs in new logged user
  const { rows } = await query(
    "INSERT INTO logs (school_id,time_in,date_logged,course) VALUES ($1,$2,$3,$4) RETURNING *",
    [id, util.getFormattedTime(), util.getFormattedDate(), course],
  );

  return rows[0];
};

export const logOut = async (school_id) => {
  const { rows } = await query(
    "UPDATE logs SET time_out = $1 WHERE time_out IS NULL AND school_id = $2  RETURNING *",
    [util.getFormattedTime(), school_id],
  );

  return rows;
};

export const filterByCourse = async (course) => {
  const { rows } = await query("SELECT * FROM logs WHERE course = $1", [
    course,
  ]);

  return rows;
};
