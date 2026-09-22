import { ConversationParticipantsRepository, ConversationsRepository } from '../../repositories/';

export async function GetAllByConversationID(conversationId: number) {
  if (conversationId <= 0) {
    throw new Error('ID da conversa inválido.');
  }

  const conversationExists = await ConversationsRepository.ExistsByID(conversationId);

  if (!conversationExists) {
    throw new Error('Conversa não encontrada.');
  }

  const participants = await ConversationParticipantsRepository.GetAllByConversationID(conversationId);

  return participants;
}
