
import { MessagesRepository } from "../../repositories";
import { UpdateMessageDTO } from "../../types/messages";

export async function update(id: number, data: UpdateMessageDTO) {
  if (id <= 0) {
    throw new Error("ID inválido.");
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Nenhum campo informado.");
  }

  const message = await MessagesRepository.GetByID(id);

  if (!message) {
    throw new Error("Mensagem não encontrada.");
  }

  await MessagesRepository.Update(id, data);
}