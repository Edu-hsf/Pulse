import { UsersRepository } from "../../repositories";
import { CreateUserDTO } from "../../types/user";
import { createHash } from 'node:crypto';

export async function Create(data: CreateUserDTO) {
  if (Object.keys(data).length === 0) {
    throw new Error("Nenhum campo informado.");
  }

  const user = await UsersRepository.GetByEmail(data.email);

  if (user && !user.deletedAt) {
    throw new Error("Já existe um usuário ativo com esse email.");
  }

  data.passwordHash = createHash('sha256').update(data.passwordHash).digest('hex');

  await UsersRepository.Create(data);
}