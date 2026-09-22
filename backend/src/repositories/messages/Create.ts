import pool from "../../config/database";
import { CreateMessageDTO } from "../../types/message";

export async function Create (data: CreateMessageDTO) {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        const messageResult = await client.query(
        `INSERT INTO MESSAGES (PARTICIPANT_ID, CONVERSATION_ID, CONTENT)
        VALUES ($1, $2, $3)
        RETURNING id`,
        [data.participantId, data.conversationId, data.content ?? null]);

        const messageId = messageResult.rows[0].id;

        if (data.attachment) {  
            await client.query(`INSERT INTO MESSAGE_ATTACHMENTS (MESSAGE_ID, TYPE, URL) VALUES ($1, $2, $3)`, [messageId, data.attachment.type, data.attachment.url]);
        }
        
        await client.query('COMMIT');

    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}