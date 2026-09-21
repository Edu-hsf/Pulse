import { UsersRepository } from "../../repositories";

export async function GetByID(id: number) {
  if (id <= 0) {
    throw new Error('ID inválido.')
  }

  const user = await UsersRepository.GetByID(id);

  if (!user || user.deletedAt) {
    throw new Error('Usuário não existe ou está desativado.')
  }

  return user;
}