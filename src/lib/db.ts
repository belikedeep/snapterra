import { Pool } from "pg";

let pool: Pool;

if (process.env.NODE_ENV === "production") {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
} else {
  if (!(global as any).pool) {
    (global as any).pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
  pool = (global as any).pool;
}

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("PG Database connected successfully");
    client.release();
  } catch (error) {
    console.error("Database connection failed: ", error);
  }
};

export const query = async (text: string, params?: any[]) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error("DB error: ", error);
    throw error;
  }
};

export default pool;
