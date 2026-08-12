import pool from "../../config/database";
import { UpdateMessageDTO } from "../../types/messages";

export async function Update(id: number, data: UpdateMessageDTO) {
  const updates = [];
  const values = [];

  values.push(id);

  let index = 1;

  if (data.content !== undefined) {
    updates.push("CONTENT = $" + ++index);
    values.push(data.content);
  }

  if (data.deletedAt !== undefined) {
    updates.push("DELETED_AT = $" + ++index);
    values.push(data.deletedAt);
  }

  return pool.query(
    `UPDATE MESSAGES SET ${updates.join(", ")} WHERE ID = $1`,
    values,
  );
}