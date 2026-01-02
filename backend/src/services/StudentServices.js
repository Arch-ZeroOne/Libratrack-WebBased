import { query } from "../dbconfig.js";

//gets all the students

export const getAllStudents = async () => {
  //gets the returned rows
  const { rows } = await query("SELECT * FROM students");

  return rows;
};
  