import pool from '../../config/database';
import { CreateConversationParticipantRecord } from '../../types/conversationParticipant';

export async function Create (data: CreateConversationParticipantRecord) {
    return await pool.query(`
        INSERT INTO CONVERSATION_PARTICIPANTS
            (USER_ID, CONVERSATION_ID, ADD_BY, ROLE)
        VALUES ($1, $2, $3, 'member')
    `, [data.userId, data.conversationId, data.addBy ?? null]);
}