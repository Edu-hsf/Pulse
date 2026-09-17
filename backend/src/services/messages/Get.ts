import { ConversationsRepository, MessagesRepository } from '../../repositories/';

export async function GetByID(id: number) {
  if (id <= 0) {
    throw new Error("ID inválido.");
  }

  const message = await MessagesRepository.GetByID(id);

  if (!message) {
    throw new Error('Mensagem não encontrada.');
  }

  return message;
}

export async function GetAllByConversationID(conversationId: number) {
  if (conversationId <= 0) {
    throw new Error('ID da conversa inválido.');
  }

  const conversation = await ConversationsRepository.GetByID(conversationId);

  if (!conversation) {
    throw new Error('A conversa informada não existe.');
  }

  const messages = await MessagesRepository.GetAllByConversationID(conversationId);

  return messages;
}

export async function GetLastByConversationID(id: number) {
  if (id <= 0) {
    throw new Error("ID inválido.");
  }

  const conversation = await ConversationsRepository.GetByID(id);

  if (!conversation) {
    throw new Error('conversa não encontrada.');
  }

  return conversation;
}