import { ConversationsRepository, UsersRepository } from '../../repositories/';
import { ConversationResponse } from '../../types/conversation';
import { MessagesService } from '../messages';

export async function GetByID(id: number) {
  if (id <= 0) {
    throw new Error("ID inválido.");
  }

  const conversation = await ConversationsRepository.GetByID(id);

  if (!conversation) {
    throw new Error('Conversa não encontrada.');
  }

  return conversation;
}

export async function GetAllByUserID(userAdminId: number) {
  if (userAdminId <= 0) {
    throw new Error('ID do administrador inválido.');
  }

  const user = await UsersRepository.GetByID(userAdminId);

  if (!user || user.deletedAt) {
    throw new Error('O usuário informado não existe ou está desativado.');
  }

  const conversationsRaw = await ConversationsRepository.GetAllByUserID(userAdminId);

  const conversations = await Promise.all(conversationsRaw.map(async (conversation) => {
    const message = await MessagesService.GetLastByConversationID(conversation.id);

    return { ...conversation, lastMassage: message } as ConversationResponse
  }))

  return conversations;
}
