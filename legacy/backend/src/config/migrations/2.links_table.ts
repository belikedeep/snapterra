import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  const client = await pool.connect();
  try {
    console.log("Starting migration to create a separate links table...");

    // 1. Create Links Table
    await client.query(`
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        url TEXT NOT NULL,
        title TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // 2. Create link_tags Table (Mapping links to tags)
    await client.query(`
      CREATE TABLE IF NOT EXISTS link_tags (
        link_id INT REFERENCES links(id) ON DELETE CASCADE,
        tag_id INT REFERENCES tags(id) ON DELETE CASCADE,
        PRIMARY KEY (link_id, tag_id)
      );
    `);

    console.log("Migration successful! Created links and link_tags tables.");
  } catch (error) {
    console.error("Migration failed:", error);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate();
