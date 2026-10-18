import { ConversationsRepository } from '../../repositories';
import { UpdateConversationDTO } from '../../types/conversation';

export async function update(userAuthId: number, id: number, data: UpdateConversationDTO) {
    if (id <= 0) {
        throw new Error('O campo "ID" deve ser maior que 0.');
    }

    if (Object.keys(data).length === 0) {
        throw new Error('Nenhum campo informado.');
    }

    const conversation = await ConversationsRepository.GetConversationByUserIdAndConversationId(userAuthId, id);

    if (!conversation) {
        throw new Error('Não é possível alterar uma conversa que não pertence ao usuário.');
    }

    await ConversationsRepository.Update(id, data);
}