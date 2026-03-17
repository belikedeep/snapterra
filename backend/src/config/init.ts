import bcrypt from "bcrypt";
import { query } from "./db";

export const initAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.log("ADMIN_EMAIL or ADMIN_PASSWORD not set in .env");
    return;
  }

  try {
    // Check if ANY user exists
    // WE only ever want one
    const res = await query("SELECT * FROM users ORDER BY id ASC");
    const count = res.rowCount ?? 0;

    if (count === 0) {
      // Create first user
      console.log("No admin found.");
      console.log("Creating from .env credentials");

      const hashedPassword = await bcrypt.hash(password, 10);
      await query("INSERT INTO users (email, password) VALUES ($1, $2)", [
        email,
        hashedPassword,
      ]);

      console.log("Admin user created successfully");
    } else {
      const user = res.rows[0];
      const isSamePassword = await bcrypt.compare(password, user.password);

      // Sync operration
      // If credentials differ from DB
      // Update the record
      if (user.email !== email || !isSamePassword) {
        console.log("Credentials changed in .env");
        console.log("Updating database");

        const newHashedPassword = await bcrypt.hash(password, 10);
        await query(
          "UPDATE users SET email = $1, password = $2 WHERE id = $3",
          [email, newHashedPassword, user.id],
        );

        console.log("Admin credentials synced and updated");
      }

      // Ensure only ONE user exists
      if (count > 1) {
        console.log("Multiple users found");
        console.log("Cleaning up extra users");

        await query("DELETE FROM users WHERE id != $1", [user.id]);

        console.log("Cleaned up extra users");
      }
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};
