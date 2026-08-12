import { ConversationsRepository, UsersRepository } from "../../repositories";
import { UpdateConversationDTO } from "../../types/conversations";

export async function update(id: number, data: UpdateConversationDTO) {
  if (id <= 0) {
    throw new Error("ID inválido.");
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Nenhum campo informado.");
  }

  if (data.userAdminId <= 0) {
    throw new Error("ID do administrador inválido.");
  }

  const conversation = await ConversationsRepository.GetByID(id);

  if (!conversation) {
    throw new Error("Conversa não encontrada.");
  }

  const user = await UsersRepository.GetByID(data.userAdminId);

  if (!user || user.deletedAt) {
    throw new Error("O usuário informado não existe ou está desativado.");
  }

  await ConversationsRepository.Update(id, data);
}