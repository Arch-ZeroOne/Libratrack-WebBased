import { query } from "../dbconfig.js";
import * as util from "../util/utils.js";

export const logs = async () => {
  const { rows } = await query("SELECT * FROM logs");

  return rows;
};
export const logIn = async (params) => {
  const { id } = params;
  const { rows } = await query(
    "INSERT INTO logs (school_id,time_in,date_logged) VALUES ($1,$2,$3) RETURNING *",
    [id, util.getFormattedTime(), util.getFormattedDate()]
  );

  return rows;
};

export const logOut = async (school_id) => {
  const { rows } = await query(
    "UPDATE logs SET time_out = $1 WHERE time_out IS NULL AND school_id = $2  RETURNING *",
    [util.getFormattedTime(), school_id]
  );

  return rows;
};
