import { UsersRepository } from "../../repositories";
import { ConversationsRepository } from "../../repositories";
import { CreateConversationDTO } from "../../types/conversations";

export async function Create(data: CreateConversationDTO) {
  if (data.userAdminId <= 0) {
    throw new Error("ID do administrador inválido.");
  }

  const user = await UsersRepository.GetByID(data.userAdminId);

  if (!user || user.deletedAt) {
    throw new Error("O usuário informado não existe ou está desativado.");
  }

  await ConversationsRepository.Create(data);
}