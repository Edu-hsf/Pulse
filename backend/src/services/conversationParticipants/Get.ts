import { ConversationParticipantsRepository, ConversationsRepository } from '../../repositories/';

export async function GetAllByConversationID(userAuthId: number, conversationId: number) {
    if (!Number.isInteger(userAuthId) || userAuthId <= 0 || !Number.isInteger(conversationId) || conversationId <= 0) {
        throw new Error('O campo "conversationId" deve ser maior que 0.');
    }

    const conversation = await ConversationsRepository.GetConversationByUserIdAndID(userAuthId, conversationId);

    if (!conversation) {
        throw new Error('Não é possível consultar participantes de uma conversa da qual você não participa.');
    }

    const participants = await ConversationParticipantsRepository.GetAllByConversationID(conversationId);

    return participants;
}
