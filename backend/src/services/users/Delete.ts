import { UsersRepository } from "../../repositories";

export async function Delete(id: number) {
  if (id <= 0) {
    throw new Error('O campo "ID" deve ser maior que 0.');
  }

  const user = await UsersRepository.GetByID(id);
  
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  await UsersRepository.Delete(id);
}