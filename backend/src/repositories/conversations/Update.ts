import pool from "../../config/database";
import { UpdateConversationDTO } from "../../types/conversation";

export async function Update(
  id: number,
  data: UpdateConversationDTO,
) {
  const updates: string[] = [];
  const values: unknown[] = [id];

  if ("name" in data) {
    if (data.name !== undefined) {
      updates.push(`name = $${values.length + 1}`);
      values.push(data.name);
    }

    if (data.description !== undefined) {
      updates.push(`description = $${values.length + 1}`);
      values.push(data.description);
    }

    if (data.avatar !== undefined) {
      updates.push(`avatar = $${values.length + 1}`);
      values.push(data.avatar);
    }

    if (data.settings !== undefined) {
      updates.push(`settings = $${values.length + 1}`);
      values.push(data.settings);
    }

    if (updates.length === 0) {
      return;
    }

    return pool.query(
      `
      UPDATE conversation_groups
      SET ${updates.join(", ")}
      WHERE id = $1
      `,
      values,
    );
  }

  if (data.settings !== undefined) {
    updates.push(`settings = $${values.length + 1}`);
    values.push(data.settings);
  }

  return pool.query(
    `
    UPDATE conversation_privates
    SET ${updates.join(", ")}
    WHERE id = $1
    `,
    values,
  );
}