import pg from "pg";

const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  database: "node_complete",
  password: "123",
});

export const db = pool;
