import { ConversationsRepository, UsersRepository } from "../../repositories";
import { CreateConversationDTO } from "../../types/conversation";

export async function Create(data: CreateConversationDTO) {
  if (data.createdBy <= 0) {
    throw new Error("ID inválido.");
  }

  const user = await UsersRepository.GetByID(data.createdBy);

  if (!user || user.deletedAt) {
    throw new Error("O usuário informado não existe ou está desativado.");
  }

  if ("participantUserIds" in data) {
    for (const userId of data.participantUserIds) {
      const participantUser = await UsersRepository.GetByID(Number(userId));

      if (!participantUser || participantUser.deletedAt) {
        throw new Error(
          `Um participante não existe ou está desativado. (ID: ${userId})`,
        );
      }
    }
  } else {
    const participantUser = await UsersRepository.GetByID(
      Number(data.participantUserId),
    );

    if (!participantUser || participantUser.deletedAt) {
      throw new Error(
        `O participante informado não existe ou está desativado.`,
      );
    }
  }

  await ConversationsRepository.Create(data);
}
