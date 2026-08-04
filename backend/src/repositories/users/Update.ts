import { UpdateUserDTO } from "../../types/user";
import pool from "../../config/database";

export async function Update(id: number, data: UpdateUserDTO) {
    const updates = [];
  const values = [];

  values.push(id);

  let index = 1;

  if (data.name !== undefined) {
    updates.push("NAME = $" + ++index);
    values.push(data.name);
  }

  if (data.email !== undefined) {
    updates.push("EMAIL = $" + ++index);
    values.push(data.email);
  }

  if (data.avatar !== undefined) {
    updates.push("AVATAR = $" + ++index);
    values.push(data.avatar);
  }

  if (data.passwordHash !== undefined) {
    updates.push("PASSWORD_HASH = $" + ++index);
    values.push(data.passwordHash);
  }

  if (data.deletedAt !== undefined) {
    updates.push("DELETED_AT = $" + ++index);
    values.push(data.deletedAt);
  }

  return pool.query(
    `UPDATE USERS SET ${updates.join(", ")} WHERE ID = $1`,
    values,
  );
}