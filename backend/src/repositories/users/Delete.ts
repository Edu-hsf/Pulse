import pool from "../../config/database";

export async function DeleteUser(id: number) {
  return pool.query('DELETE FROM USERS WHERE ID = $1', [id]);
}