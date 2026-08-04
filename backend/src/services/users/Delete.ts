import pool from "../../config/database";
import { UsersRepository } from "../../repositories";

export async function DeleteUser(id: number) {
  if (id <= 0) {
    throw new Error("Nenhum campo informado.");
  }

  const user = await UsersRepository.GetByID(id);
  
  if (!user) {
    throw new Error("Usuário não encontrado.");
  }

  await UsersRepository.DeleteUser(id);
}