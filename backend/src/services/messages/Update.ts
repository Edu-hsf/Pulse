
import { MessagesRepository } from "../../repositories";
import { UpdateMessageDTO } from "../../types/message";

export async function update(authUserId: number, id: number, data: UpdateMessageDTO) {
  if (id <= 0) {
    throw new Error('O campo "ID" deve ser maior que 0.');
  }

  if (Object.keys(data).length === 0) {
    throw new Error("Nenhum campo informado.");
  }

  const message = await MessagesRepository.GetMessageByUserIdAndMessageId(authUserId, id);

  if (!message) {
    throw new Error('Não é possível alterar uma mensagem que não pertence ao usuário.');
  }

  if (message.deletedAt) {
    throw new Error('Não é possível alterar uma mensagem apagada.');
  }

  await MessagesRepository.Update(id, data);
}