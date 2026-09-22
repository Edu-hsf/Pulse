import { ConversationParticipantsRepository, ConversationsRepository, MessagesRepository, UsersRepository } from "../../repositories";
import { CreateMessageDTO } from "../../types/message";

export async function Create(authUserId: number, data: CreateMessageDTO) {
  if (data.createdBy <= 0) {
    throw new Error("ID do participante inválido.");
  }

  if (data.conversationId <= 0) {
    throw new Error("ID da conversa inválido.");
  }
  
  const participant = await ConversationParticipantsRepository.GetByID(data.createdBy);

  if (!participant || participant.deletedAt) {
    throw new Error("O participante informado não existe ou está desativado.");
  }

  //console.log(authUserId, participant.userId)

  if (authUserId !== participant.userId) {
    throw new Error("Não é permitido criar uma mensagem em nome de outro usuário.")
  }

  const conversation = await ConversationsRepository.ExistsByID(data.conversationId);

  if (!conversation) {
    throw new Error("O conversa informada não existe.");
  }

  await MessagesRepository.Create(data);
}