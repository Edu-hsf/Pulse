import pool from "../../config/database";

export async function Delete(id: number) {
  return pool.query('DELETE FROM CONVERSATION_PARTICIPANTS WHERE ID = $1', [id]);
}