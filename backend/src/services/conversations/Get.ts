import { ConversationsRepository } from '../../repositories/';

export async function GetAllByUserID(userAuthId: number, userId: number) {
  if (userId <= 0) {
    throw new Error('O campo "UserId" deve ser maior que 0.');
  }

  if (userAuthId !== userId) {
    throw new Error('Não é possível obter conversas de outro usuário.');
  }

  const conversations = await ConversationsRepository.GetAllByUserID(userId);

  return conversations;
}
