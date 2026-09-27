import { ConversationsRepository, UsersRepository } from '../../repositories/';

export async function GetAllByUserID(userId: number) {
  if (userId <= 0) {
    throw new Error('O campo "UserId" deve ser maior que 0.');
  }

  const user = await UsersRepository.GetByID(userId);

  if (!user || user.deletedAt) {
    throw new Error('O usuário informado não existe ou está desativado.');
  }

  const conversations = await ConversationsRepository.GetAllByUserID(userId);

  return conversations;
}
