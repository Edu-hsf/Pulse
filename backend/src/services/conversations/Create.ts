import { UsersRepository } from "../../repositories";
import { ConversationsRepository } from "../../repositories";

export async function Create() {
  await ConversationsRepository.Create();
}