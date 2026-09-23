import { ConversationsRepository, MessagesRepository } from '../../repositories/';

export async function GetMessagesByConversationID(authUserId: number, conversationId: number, limit: number, cursor?: number) {
  if (conversationId <= 0) {
    throw new Error('ID da conversa inválido.');
  }

  if (limit <= 0) {
    throw new Error('Limite inválido.');
  }

  if (cursor && cursor <= 0) {
    throw new Error('Cursor inválido.');
  }

  const conversationExists = await ConversationsRepository.GetMessagesByUserIdAndConversationId(authUserId, conversationId);

  if (!conversationExists) {
    throw new Error('Não é possível listar mensagens de uma conversa a qual o usuário não participa.')
  }

  const messages = await MessagesRepository.GetMessagesByConversationID(conversationId, limit, cursor);

  return messages;
}