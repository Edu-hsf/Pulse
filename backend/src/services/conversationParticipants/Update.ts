import { ConversationParticipantsRepository, ConversationsRepository } from '../../repositories';
import { UpdateConversationParticipantDTO } from '../../types/conversationParticipant';

export async function update(
    userAuthId: number,
    conversationId: number,
    participantId: number,
    data: UpdateConversationParticipantDTO,
) {
    if (
        !Number.isInteger(userAuthId) || userAuthId <= 0 ||
        !Number.isInteger(conversationId) || conversationId <= 0 ||
        !Number.isInteger(participantId) || participantId <= 0
    ) {
        throw new Error('Os identificadores devem ser maiores que 0.');
    }

    if (Object.keys(data).length === 0) {
        throw new Error('Nenhum campo informado.');
    }

    const conversation = await ConversationsRepository.GetConversationByUserIdAndID(userAuthId, conversationId);

    if (!conversation) {
        throw new Error('Não é possível alterar participantes de uma conversa da qual você não participa.');
    }

    const participant = await ConversationParticipantsRepository.GetByID(participantId);

    if (!participant || participant.deletedAt || participant.leftAt || Number(participant.conversationId) !== conversationId) {
        throw new Error('Participante informado não existe ou está desativado.');
    }

    const isSelf = Number(participant.userId) === userAuthId;
    const hasAdminChanges = data.role !== undefined || data.removedBy !== undefined || (!isSelf && data.leftAt !== undefined);

    if (hasAdminChanges && conversation.role === 'member') {
        throw new Error('Apenas administradores podem alterar outro participante ou seu papel.');
    }

    if (data.removedBy != null && data.removedBy !== userAuthId) {
        throw new Error('O campo "removedBy" deve corresponder ao usuário autenticado.');
    }

    const updateData = !isSelf && data.leftAt
        ? { ...data, removedBy: userAuthId }
        : data;

    await ConversationParticipantsRepository.Update(participantId, updateData);
}