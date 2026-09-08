import { UsersRepository } from "../../repositories";
import { CreateUserDTO } from "../../types/user";
import argon2 from "argon2";

export async function Create(data: CreateUserDTO) {
  if (Object.keys(data).length === 0) {
    throw new Error("Nenhum campo informado.");
  }

  const user = await UsersRepository.GetByEmail(data.email);

  if (user && !user.deletedAt) {
    throw new Error("Já existe um usuário ativo com esse email.");
  }

  data.passwordHash = await argon2.hash(data.passwordHash, {
    type: argon2.argon2id
  })

  await UsersRepository.Create(data);
}