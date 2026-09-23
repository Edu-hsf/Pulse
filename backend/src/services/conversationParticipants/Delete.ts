import { ConversationParticipantsRepository } from "../../repositories";


export async function Delete(id: number) {
  if (id <= 0) {
    throw new Error('O campo "ID" deve ser maior que 0.');
  }

  const conversationParticipant = await ConversationParticipantsRepository.GetByID(id);
  
  if (!conversationParticipant) {
    throw new Error("Participante não encontrado.");
  }

  await ConversationParticipantsRepository.Delete(id);
}