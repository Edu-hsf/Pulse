import { ConversationsRepository, MessagesRepository } from '../../repositories/';

export async function GetMessagesByConversationID(conversationId: number, limit: number, cursor?: number) {
  if (conversationId <= 0) {
    throw new Error('ID da conversa inválido.');
  }

  if (limit <= 0) {
    throw new Error('Limite inválido.');
  }

  if (cursor && cursor <= 0) {
    throw new Error('Cursor inválido.');
  }

  const conversation = await ConversationsRepository.ExistsByID(conversationId);

  if (!conversation) {
    throw new Error('A conversa informada não existe.');
  }

  const messages = await MessagesRepository.GetMessagesByConversationID(conversationId, limit, cursor);

  return messages;
}