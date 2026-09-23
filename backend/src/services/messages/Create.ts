import { ConversationParticipantsRepository, MessagesRepository } from "../../repositories";
import { CreateMessageDTO } from "../../types/message";

export async function Create(authUserId: number, data: CreateMessageDTO) {
  if (data.createdBy <= 0) {
    throw new Error("ID do participante inválido.");
  }

  if (data.conversationId <= 0) {
    throw new Error("ID da conversa inválido.");
  }

  if (!data.content && !data.attachment) {
    throw new Error("A mensagem deve ter ao menos um texto ou um anexo.");
  }

  if (data.content && !data.content.trim()) {
    throw new Error("O conteúdo da mensagem não pode estar vazio.");
  }
  
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