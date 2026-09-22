import { ConversationParticipantsRepository } from "../../repositories";


export async function Delete(id: number) {
  if (id <= 0) {
    throw new Error("ID inválido.");
  }

  const conversationParticipant = await ConversationParticipantsRepository.ExistsByID(id);
  
  if (!conversationParticipant) {
    throw new Error("Participante não encontrado.");
  }

  await ConversationParticipantsRepository.Delete(id);
}