import { ConversationsRepository, UsersRepository } from "../../repositories";
import { UpdateConversationDTO } from "../../types/conversation";

export async function update(id: number, data: UpdateConversationDTO) {
  if (id <= 0) {
    throw new Error("ID inválido.");
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Nenhum campo informado.");
  }

  const conversation = await ConversationsRepository.ExistsByID(id);

  if (!conversation) {
    throw new Error("Conversa não encontrada.");
  }

  await ConversationsRepository.Update(id, data);
}