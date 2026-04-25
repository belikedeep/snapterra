import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // 1. Drop the existing constraint
  await knex.raw('ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_status_check');

  // 2. Add the new constraint including 'in-progress'
  await knex.raw("ALTER TABLE tasks ADD CONSTRAINT tasks_status_check CHECK (status IN ('todo', 'in-progress', 'done'))");
}

export async function down(knex: Knex): Promise<void> {
  // Revert to the old constraint
  await knex.raw('ALTER TABLE tasks DROP CONSTRAINT IF EXISTS tasks_status_check');
  await knex.raw("ALTER TABLE tasks ADD CONSTRAINT tasks_status_check CHECK (status IN ('todo', 'done'))");
}
