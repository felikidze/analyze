import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  password: "advance",
  host: "localhost",
  port: "5432",
  database: "analyze",
});

export default pool;