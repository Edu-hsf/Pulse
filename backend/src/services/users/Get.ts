import { UsersRepository } from "../../repositories";

export async function GetAll() {
  return UsersRepository.GetAll();
}

export async function GetByID(id: number) {
  if (id <= 0) {
    throw new Error("ID inválido.");
  }

  const user = await UsersRepository.GetByID(id);

  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  return user;
}