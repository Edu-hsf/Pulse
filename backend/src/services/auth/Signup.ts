import { UsersRepository } from "../../repositories";
import { CreateUserDTO } from "../../types/user";
import argon2 from "argon2";

export async function Signup(data: CreateUserDTO) {
  const user = await UsersRepository.GetByEmail(data.email);

  if (user && !user.deletedAt) {
    throw new Error("Já existe um usuário ativo com esse email.");
  }

  data.password = await argon2.hash(data.password, {
    type: argon2.argon2id
  })

  await UsersRepository.Create(data);
}