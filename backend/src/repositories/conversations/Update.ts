import pool from "../../config/database";
import { UpdateConversationDTO } from "../../types/conversation";

export async function Update(id: number, data: UpdateConversationDTO) {
  const updates = [];
  const values = [];

  values.push(id);

  let index = 1;

  if (data.deletedAt !== undefined) {
    updates.push("DELETED_AT = $" + ++index);
    values.push(data.deletedAt);
  }

  return pool.query(
    `UPDATE CONVERSATIONS SET ${updates.join(", ")} WHERE ID = $1`,
    values,
  );
}