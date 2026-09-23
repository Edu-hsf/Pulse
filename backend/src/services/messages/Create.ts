import { ConversationParticipantsRepository, MessagesRepository } from "../../repositories";
import { CreateMessageDTO } from "../../types/message";

export async function Create(authUserId: number, data: CreateMessageDTO) {  
  const participant = await ConversationParticipantsRepository.GetByID(data.createdBy);

  if (!participant || participant.deletedAt) {
    throw new Error("O participante informado não existe ou está desativado.");
  }

  if (authUserId !== participant.userId) {
    throw new Error("Não é permitido criar uma mensagem em nome de outro usuário.")
  }

  if (data.conversationId !== participant.conversationId) {
    throw new Error("Não é permitido enviar mensagens para uma conversa da qual o usuário não participa.");
  }

  await MessagesRepository.Create(data);
}