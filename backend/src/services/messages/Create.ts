import { ConversationsRepository, MessagesRepository, UsersRepository } from "../../repositories";
import { CreateMessageDTO } from "../../types/messages";

export async function Create(data: CreateMessageDTO) {
  if (data.userId <= 0) {
    throw new Error("ID do usuário inválido.");
  }

  if (data.conversationId <= 0) {
    throw new Error("ID da conversa inválido.");
  }

  const user = await UsersRepository.GetByID(data.userId);

  if (!user || user.deletedAt) {
    throw new Error("O usuário informado não existe ou está desativado.");
  }

  const conversation = await ConversationsRepository.GetByID(data.conversationId);

  if (!conversation) {
    throw new Error("O conversa informada não existe.");
  }

  await MessagesRepository.Create(data);
}