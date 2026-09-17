import { ConversationsRepository, UsersRepository } from "../../repositories";
import { UpdateConversationDTO } from "../../types/conversation";

export async function update(id: number, data: UpdateConversationDTO) {
  if (id <= 0) {
    throw new Error("ID inválido.");
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Nenhum campo informado.");
  }

  const conversation = await ConversationsRepository.GetByID(id);

  if (!conversation) {
    throw new Error("Conversa não encontrada.");
  }

  if (data.participantAdminId) {
    if (data.participantAdminId <= 0) {
      throw new Error("ID do administrador inválido.");
    }

    const user = await UsersRepository.GetByID(data.participantAdminId);

    if (!user || user.deletedAt) {
      throw new Error("O usuário informado não existe ou está desativado.");
    }
  }

  await ConversationsRepository.Update(id, data);
}