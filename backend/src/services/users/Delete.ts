import { UsersRepository } from "../../repositories";

export async function Delete(id: number) {
  if (id <= 0) {
    throw new Error("ID inválido.");
  }

  const user = await UsersRepository.GetByID(id);
  
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  await UsersRepository.Delete(id);
}