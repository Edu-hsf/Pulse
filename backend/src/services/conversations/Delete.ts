import { ConversationsRepository } from "../../repositories";

export async function Delete(id: number) {
  if (id <= 0) {
    throw new Error("ID inválido.");
  }

  const conversation = await ConversationsRepository.GetByID(id);
  
  if (!conversation) {
    throw new Error("Conversa não encontrada.");
  }

  await ConversationsRepository.Delete(id);
}