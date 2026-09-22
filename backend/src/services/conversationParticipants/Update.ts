import { ConversationParticipantsRepository } from "../../repositories";
import { UpdateConversationParticipantDTO } from "../../types/conversationParticipant";

export async function update(id: number, data: UpdateConversationParticipantDTO) {
  if (id <= 0) {
    throw new Error("ID inválido.");
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Nenhum campo informado.");
  }

  const participant = await ConversationParticipantsRepository.ExistsByID(id);

  if (!participant) {
    throw new Error("Participante não encontrado.");
  }

  await ConversationParticipantsRepository.Update(id, data);
}