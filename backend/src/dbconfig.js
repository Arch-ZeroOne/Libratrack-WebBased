import pg from "pg";
import env from "dotenv";

env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

//Catches errors during database connection

db.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

//helper function for query

export const query = (text, params) => db.query(text, params);
