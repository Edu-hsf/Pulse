import pool from "../../config/database";
import { CreateUserDTO } from "../../types/user";

export async function Create(data: CreateUserDTO) {
  return pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, LOWER($2), $3)`,
    [data.name, data.email, data.passwordHash]
  );
}