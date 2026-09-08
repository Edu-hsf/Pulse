import { UsersRepository } from "../../repositories";
import { UpdateUserDTO } from "../../types/user";
import argon2 from "argon2";

export async function update(id: number, data: UpdateUserDTO) {
  if (id <= 0) {
    throw new Error("ID inválido.");
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Nenhum campo informado.");
  }

  const user = await UsersRepository.GetByID(id);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  if (data.passwordHash !== undefined) {
    data.passwordHash = await argon2.hash(data.passwordHash, {
      type: argon2.argon2id
    })
  }

  await UsersRepository.Update(id, data);
}