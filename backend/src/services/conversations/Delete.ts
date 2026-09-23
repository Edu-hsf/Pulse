import { ConversationsRepository } from "../../repositories";

export async function Delete(id: number) {
  if (id <= 0) {
    throw new Error('O campo "ID" deve ser maior que 0.');
  }

  const conversation = await ConversationsRepository.ExistsByID(id);
  
  if (!conversation) {
    throw new Error("Conversa não encontrada.");
  }

  await ConversationsRepository.Delete(id);
}