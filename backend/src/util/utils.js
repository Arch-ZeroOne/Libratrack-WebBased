import { query } from "../dbconfig.js";

export function getFormattedDate() {
  const today = new Date();
  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
export async function generateSchoolId() {
  const today = new Date();
  const year = today.getFullYear();
  let count = await getStudentCount();

  return `STU-${year}-${String(count + 1).padStart(4, "0")}`;
}
export const getStudentCount = async () => {
  const result = await query("SELECT COUNT(*) FROM students");

  const { rows } = result;

  return parseInt(rows[0].count);
};

export function getFormattedTime() {
  const today = new Date();
  const shortTime = today.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    //AM or PM
    hour12: true,
  });

  return shortTime;
}
