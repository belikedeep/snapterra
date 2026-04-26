import { query } from "./src/lib/db";

async function checkSchema() {
  const tables = ['tasks', 'links', 'screenshots'];
  for (const table of tables) {
    console.log(`--- Schema for ${table} ---`);
    const res = await query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = $1
    `, [table]);
    console.table(res.rows);
  }
  process.exit(0);
}

checkSchema();
