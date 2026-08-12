import { MessagesRepository } from "../../repositories";


export async function Delete(id: number) {
  if (id <= 0) {
    throw new Error("ID inválido.");
  }

  const message = await MessagesRepository.GetByID(id);
  
  if (!message) {
    throw new Error("Mensagem não encontrada.");
  }

  await MessagesRepository.Delete(id);
}