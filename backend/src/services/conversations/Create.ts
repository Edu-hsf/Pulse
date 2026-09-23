import { ConversationsRepository, UsersRepository } from "../../repositories";
import { CreateConversationDTO } from "../../types/conversation";

export async function Create(authUserId: number, data: CreateConversationDTO) {
  const user = await UsersRepository.GetByID(data.createdBy);

  if (!user || user.deletedAt) {
    throw new Error("O usuário informado não existe ou está desativado.");
  }

  if (authUserId !== data.createdBy) {
    throw new Error("Não é permitido criar uma conversa em nome de outro usuário.")
  }

  if ("participantUserIds" in data) {
    const idsSet = new Set(data.participantUserIds);
    

    if (idsSet.size !== data.participantUserIds.length) {
      throw new Error('Não pode haver IDs repetidos.')
    }

    for (const userId of data.participantUserIds) {
      const participantUser = await UsersRepository.GetByID(userId);

      if (!participantUser || participantUser.deletedAt) {
        throw new Error(
          `Um participante não existe ou está desativado. (ID: ${userId})`,
        );
      }
    }
  } else {
    const participantUser = await UsersRepository.GetByID(
      data.participantUserId,
    );

    if (!participantUser || participantUser.deletedAt) {
      throw new Error(
        `O participante informado não existe ou está desativado.`,
      );
    }
  }

  await ConversationsRepository.Create(data);
}
