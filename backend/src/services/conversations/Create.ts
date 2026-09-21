import { ConversationsRepository } from "../../repositories";

export async function Create(userId: number) {
  await ConversationsRepository.Create(userId);
}