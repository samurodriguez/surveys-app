import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  port: 3306,
  database: "surveys_app",
  user: "root",
  password: "root",
});

export { pool };
