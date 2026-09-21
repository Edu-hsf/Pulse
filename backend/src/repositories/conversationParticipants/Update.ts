import pool from "../../config/database";
import { UpdateConversationParticipantDTO } from "../../types/conversationParticipant";

export async function Update(id: number, data: UpdateConversationParticipantDTO) {
  const updates = [];
  const values = [];

  values.push(id);

  let index = 1;

  if (data.leftAt !== undefined) {
    updates.push("LEFT_AT = $" + ++index);
    values.push(data.leftAt);
  }

  if (data.removedBy !== undefined) {
    updates.push("REMOVED_BY = $" + ++index);
    values.push(data.removedBy);
  }

  if (data.lastReadMessageId !== undefined) {
    updates.push("LAST_READ_MESSAGE_ID = $" + ++index);
    values.push(data.lastReadMessageId);
  }

  if (data.role !== undefined) {
    updates.push("ROLE = $" + ++index);
    values.push(data.role);
  }

  return pool.query(
    `UPDATE CONVERSATION_PARTICIPANTS SET ${updates.join(", ")} WHERE ID = $1`,
    values,
  );
}