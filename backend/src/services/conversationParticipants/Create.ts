import {
    ConversationParticipantsRepository,
    ConversationsRepository,
    UsersRepository,
} from '../../repositories';
import { CreateConversationParticipantRecord } from '../../types/conversationParticipant';

export async function AddParticipant(userAuthId: number, conversationId: number, userId: number) {
    if (!Number.isInteger(conversationId) || conversationId <= 0 || !Number.isInteger(userId) || userId <= 0) {
        throw new Error('Os identificadores da conversa e do usuário devem ser maiores que 0.');
    }

    const user = await UsersRepository.GetByID(userId);

    if (!user || user.deletedAt) {
        throw new Error('O usuário informado não existe ou está desativado.');
    }

    const conversation = await ConversationsRepository.GetConversationByUserIdAndID(userAuthId, conversationId);

    if (!conversation) {
        throw new Error('Não é possível adicionar participantes a uma conversa da qual você não participa.');
    }

    if (conversation?.settings && 'permissions' in conversation.settings) {
        const groupSettings = conversation?.settings.permissions;

        if (groupSettings.whoCanAddMembers === 'admins' && conversation.role === 'member') {
            throw new Error('Apenas administradores podem adicionar participantes a essa conversa.');
        }
    } else {
        throw new Error('Essa não é uma conversa de grupo.');
    }

    const alreadyParticipant = await ConversationParticipantsRepository.ExistsByUserIDAndConversationID(userId, conversationId);

    if (alreadyParticipant) {
        throw new Error('O usuário já é participante desta conversa.');
    }

    const data: CreateConversationParticipantRecord = {
        userId,
        conversationId,
        addBy: userAuthId,
    };

    await ConversationParticipantsRepository.Create(data);
}

export async function JoinGroup(userAuthId: number, groupLink: string) {
    const user = await UsersRepository.GetByID(userAuthId);

    if (!user || user.deletedAt) {
        throw new Error('O usuário informado não existe ou está desativado.');
    } 

    const conversation = await ConversationsRepository.GetByGroupLink(groupLink);

    if (!conversation) {
        throw new Error('Conversa não encontrada com o link de grupo informado.');
    }

    const existingParticipant = await ConversationParticipantsRepository.ExistsByUserIDAndConversationID(userAuthId, conversation.id);

    if (existingParticipant) {
        throw new Error('O usuário já é participante desta conversa.');
    }

    const data: CreateConversationParticipantRecord = {
        userId: userAuthId,
        conversationId: conversation.id,
        addBy: null,
    };

    await ConversationParticipantsRepository.Create(data);
}