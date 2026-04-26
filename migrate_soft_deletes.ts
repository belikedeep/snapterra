import { query } from "./src/lib/db";

async function runMigration() {
  const tables = ['tasks', 'links', 'screenshots'];
  for (const table of tables) {
    console.log(`Adding deleted_at to ${table}...`);
    try {
      await query(`ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMP WITH TIME ZONE DEFAULT NULL`);
      console.log(`Success for ${table}`);
    } catch (e) {
      console.error(`Failed for ${table}:`, e);
    }
  }
  process.exit(0);
}

runMigration();
