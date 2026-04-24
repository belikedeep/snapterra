import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("PG Database connected successfully");
    client.release();
  } catch (error) {
    console.error("Database connection failed: ", error);
    process.exit(1);
  }
};

export const query = async (text: string, params?: any[]) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.log("DB error: ", error);
    throw error;
  }
};
