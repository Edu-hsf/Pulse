import {
    ConversationParticipantsRepository,
    ConversationsRepository,
    UsersRepository,
} from '../../repositories';
import { CreateConversationParticipantDTO } from '../../types/conversationParticipant';

export async function Add(userAuthId: number, data: CreateConversationParticipantDTO) {
    if (!data.addBy) {
        throw new Error('O campo "addBy" é obrigatório para adicionar participantes a uma conversa.');
    }

    const user = await UsersRepository.GetByID(data.userId);

    if (!user || user.deletedAt) {
        throw new Error('O usuário informado não existe ou está desativado.');
    }

    const conversation = await ConversationsRepository.GetConversationByUserIdAndID(userAuthId, data.conversationId);

    if (!conversation) {
        throw new Error('Não é possível adicionar participantes a uma conversa que não lhe pertence.');
    }

    if (conversation?.settings && 'permissions' in conversation.settings) {
        const groupSettings = conversation?.settings.permissions;

        if (groupSettings.whoCanAddMembers === 'admins' && conversation.role === 'member') {
            throw new Error('Apenas administradores podem adicionar participantes a essa conversa.');
        }
    } else {
        throw new Error('Essa não é uma conversa de grupo.');
    }

    await ConversationParticipantsRepository.Create(data);
}

export async function Join(userAuthId: number, groupLink: string) {
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

    const data: CreateConversationParticipantDTO = {
        userId: userAuthId,
        conversationId: conversation.id,
        addBy: undefined, // Como o usuário está se juntando por conta própria, não há um "addBy" específico
    };

    await ConversationParticipantsRepository.Create(data);
}