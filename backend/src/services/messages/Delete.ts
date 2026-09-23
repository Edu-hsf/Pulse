import { MessagesRepository } from "../../repositories";


export async function Delete(id: number) {
  if (id <= 0) {
    throw new Error('O campo "ID" deve ser maior que 0.');
  }

  const message = await MessagesRepository.ExistsByID(id);
  
  if (!message) {
    throw new Error("Mensagem não encontrada.");
  }

  await MessagesRepository.Delete(id);
}