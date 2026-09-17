import { UsersRepository } from "../../repositories";

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

export async function GetByEmailAndPassword(email: string, password: string) {
  const user = await UsersRepository.GetByEmailAndPassword(email, password)

  if (!user) {
    throw new Error('Email ou senha inválidos.')
  }

  return user;
}