import pool from "../../config/database";
import { UpdateConversationDTO } from "../../types/conversations";

export async function Update(id: number, data: UpdateConversationDTO) {
  return pool.query(
    `UPDATE CONVERSATIONS SET USER_ADMIN_ID = $1 WHERE ID = $2`,
    [data.userAdminId, id],
  );
}