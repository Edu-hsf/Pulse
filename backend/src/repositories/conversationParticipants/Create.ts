import pool from '../../config/database';
import { CreateConversationParticipantDTO } from '../../types/conversationParticipant';

export async function Create (data: CreateConversationParticipantDTO) {
    return await pool.query(`
        INSERT INTO CONVERSATION_PARTICIPANTS
            (USER_ID, CONVERSATION_ID, ADD_BY, ROLE)
        VALUES ($1, $2, $3, 'member')
    `, [data.userId, data.conversationId, data.addBy ?? null]);
}