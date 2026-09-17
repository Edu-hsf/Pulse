import pool from "../../config/database";
import { UpdateConversationDTO } from "../../types/conversation";

export async function Update(id: number, data: UpdateConversationDTO) {
  const updates = [];
  const values = [];

  values.push(id);

  let index = 1;

  if (data.participantAdminId !== undefined) {
    updates.push("PARTICIPANT_ADMIN_ID = $" + ++index);
    values.push(data.participantAdminId);
  }

  if (data.avatar !== undefined) {
    updates.push("AVATAR = $" + ++index);
    values.push(data.avatar);
  }

  return pool.query(
    `UPDATE CONVERSATIONS SET ${updates.join(", ")} WHERE ID = $1`,
    values,
  );
}