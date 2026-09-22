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

  if ("participantsUserId" in data) {
    for (const userId in data.participantsUserId) {
      if (Number(userId) <= 0) {
        throw new Error(`Um participante tem o ID inválido. (ID: ${userId})`);
      }

      const participantUser = await UsersRepository.GetByID(Number(userId));

      if (!participantUser || participantUser.deletedAt) {
        throw new Error(
          `Um participante não existe ou está desativado. (ID: ${userId})`,
        );
      }
    }
  } else {
    if (data.participantUserId <= 0) {
      throw new Error("ID do participante inválido.");
    }

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
