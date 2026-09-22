import {
  ConversationParticipantsRepository,
  ConversationsRepository,
  UsersRepository,
} from "../../repositories";
import { CreateConversationParticipantDTO } from "../../types/conversationParticipant";

export async function Create(data: CreateConversationParticipantDTO) {
  if (data.userId <= 0) {
    throw new Error("ID do usuário inválido.");
  }

  if (data.conversationId <= 0) {
    throw new Error("ID da conversa inválido.");
  }

  const user = await UsersRepository.GetByID(data.userId);

  if (!user || user.deletedAt) {
    throw new Error("O usuário informado não existe ou está desativado.");
  }

  const conversationExists = await ConversationsRepository.ExistsByID(
    data.conversationId,
  );

  if (!conversationExists) {
    throw new Error("Conversa não encontrada.");
  }

  await ConversationParticipantsRepository.Create(data);
}
