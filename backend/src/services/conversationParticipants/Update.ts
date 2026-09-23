import { ConversationParticipantsRepository } from "../../repositories";
import { UpdateConversationParticipantDTO } from "../../types/conversationParticipant";

export async function update(id: number, data: UpdateConversationParticipantDTO) {
  if (id <= 0) {
    throw new Error('O campo "ID" deve ser maior que 0.');
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Nenhum campo informado.");
  }

  const participant = await ConversationParticipantsRepository.GetByID(id);

  if (!participant || participant.deletedAt) {
    throw new Error("Participante informado não existe ou está desativado.");
  }

  await ConversationParticipantsRepository.Update(id, data);
}