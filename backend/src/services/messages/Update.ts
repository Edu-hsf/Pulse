
import { MessagesRepository } from "../../repositories";
import { UpdateMessageDTO } from "../../types/message";

export async function update(id: number, data: UpdateMessageDTO) {
  if (id <= 0) {
    throw new Error('O campo "ID" deve ser maior que 0.');
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Nenhum campo informado.");
  }

  const message = await MessagesRepository.ExistsByID(id);

  if (!message) {
    throw new Error("Mensagem não encontrada.");
  }

  await MessagesRepository.Update(id, data);
}