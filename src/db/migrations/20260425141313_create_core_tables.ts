import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // 1. Tags table
  if (!(await knex.schema.hasTable("tags"))) {
    await knex.schema.createTable("tags", (table) => {
      table.increments("id").primary();
      table.string("name").unique().notNullable();
      table.timestamps(true, true);
    });
  }

  // 2. Links table
  if (!(await knex.schema.hasTable("links"))) {
    await knex.schema.createTable("links", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("url").notNullable();
      table.string("title");
      table.timestamps(true, true);
    });
  }

  // 3. Link Tags (Many-to-Many)
  if (!(await knex.schema.hasTable("link_tags"))) {
    await knex.schema.createTable("link_tags", (table) => {
      table.increments("id").primary();
      table
        .integer("link_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("links")
        .onDelete("CASCADE");
      table
        .integer("tag_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tags")
        .onDelete("CASCADE");
      table.unique(["link_id", "tag_id"]);
    });
  }

  // 4. Screenshots table
  if (!(await knex.schema.hasTable("screenshots"))) {
    await knex.schema.createTable("screenshots", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("filename").notNullable();
      table.string("title");
      table.timestamps(true, true);
    });
  }

  // 5. Screenshot Tags (Many-to-Many)
  if (!(await knex.schema.hasTable("screenshot_tags"))) {
    await knex.schema.createTable("screenshot_tags", (table) => {
      table.increments("id").primary();
      table
        .integer("screenshot_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("screenshots")
        .onDelete("CASCADE");
      table
        .integer("tag_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("tags")
        .onDelete("CASCADE");
      table.unique(["screenshot_id", "tag_id"]);
    });
  }

  // 6. Tasks table
  if (!(await knex.schema.hasTable("tasks"))) {
    await knex.schema.createTable("tasks", (table) => {
      table.increments("id").primary();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.string("title").notNullable();
      table.text("description");
      table.string("status").defaultTo("todo"); // todo, in-progress, done, etc.
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("tasks");
  await knex.schema.dropTableIfExists("screenshot_tags");
  await knex.schema.dropTableIfExists("screenshots");
  await knex.schema.dropTableIfExists("link_tags");
  await knex.schema.dropTableIfExists("links");
  await knex.schema.dropTableIfExists("tags");
}
