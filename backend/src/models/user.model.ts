import bcrypt from "bcrypt";
import { query } from "../db/pool";

export async function createUser(username: string, email: string, password: string) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const sql = `
    INSERT INTO users (username, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, username, email, created_at;
  `;
  const { rows } = await query(sql, [username, email, hashedPassword]);
  return rows[0];
}

export async function findUserByEmail(email: string) {
  const sql = `SELECT * FROM users WHERE email = $1 LIMIT 1;`;
  const { rows } = await query(sql, [email]);
  return rows[0] || null;
}
