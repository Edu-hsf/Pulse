import { createHash } from "node:crypto";
import { UsersRepository } from "../../repositories";
import { UpdateUserDTO } from "../../types/user";

export async function update(id: number, data: UpdateUserDTO) {
  if (Object.keys(data).length === 0) {
    throw new Error("Nenhum campo informado.");
  }

  const user = await UsersRepository.GetByID(id);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (data.passwordHash !== undefined) {
    data.passwordHash = createHash('sha256').update(data.passwordHash).digest('hex');
  }

  await UsersRepository.Update(id, data);
}