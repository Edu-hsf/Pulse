import pool from "../../config/database";
import { messageResponseSchema } from "../../types/message";

export async function GetMessagesByConversationID (conversationId: number, limit: number, cursor?: number) {
    const result = cursor 
    ? await pool.query(`
        SELECT
            M.ID AS id,
                CP.ID AS participant_id,
                    U.ID AS user_id,
                    U.NAME AS user_name,
                    U.EMAIL AS user_email,
                    U.AVATAR AS user_avatar,
                    U.CREATED_AT AS user_created_at,
                    U.DELETED_AT AS user_deleted_at,
                CP.JOINED_AT AS participant_joined_at,
                CP.LEFT_AT AS participant_left_at,
                CP.ADD_BY AS participant_add_by,
                CP.REMOVED_BY AS participant_removed_at,
                CP.ROLE AS participant_role,
                    ATT.ID AS attachment_id,
                    ATT.TYPE AS attachment_type,
                    ATT.URL AS attachment_url,
            M.CONTENT AS content,
            M.CREATED_AT AS created_at,
            M.DELETED_AT AS deleted_at
        FROM MESSAGES M
        LEFT JOIN CONVERSATION_PARTICIPANTS CP
            ON CP.ID = M.PARTICIPANT_ID
        LEFT JOIN USERS U
            ON U.ID = CP.USER_ID
        LEFT JOIN MESSAGE_ATTACHMENTS ATT
            ON ATT.MESSAGE_ID = M.ID
        WHERE M.CONVERSATION_ID = $1 AND M.ID < $3
        ORDER BY M.ID DESC
        LIMIT $2`, [conversationId, limit, cursor])
    : await pool.query(`
        SELECT
            M.ID AS id,
                CP.ID AS participant_id,
                    U.ID AS user_id,
                    U.NAME AS user_name,
                    U.EMAIL AS user_email,
                    U.AVATAR AS user_avatar,
                    U.CREATED_AT AS user_created_at,
                    U.DELETED_AT AS user_deleted_at,
                CP.JOINED_AT AS participant_joined_at,
                CP.LEFT_AT AS participant_left_at,
                CP.ADD_BY AS participant_add_by,
                CP.REMOVED_BY AS participant_removed_at,
                CP.ROLE AS participant_role,
                    ATT.ID AS attachment_id,
                    ATT.TYPE AS attachment_type,
                    ATT.URL AS attachment_url,
            M.CONTENT AS content,
            M.CREATED_AT AS created_at,
            M.DELETED_AT AS deleted_at
        FROM MESSAGES M
        LEFT JOIN CONVERSATION_PARTICIPANTS CP
            ON CP.ID = M.PARTICIPANT_ID
        LEFT JOIN USERS U
            ON U.ID = CP.USER_ID
        LEFT JOIN MESSAGE_ATTACHMENTS ATT
            ON ATT.MESSAGE_ID = M.ID
        WHERE M.CONVERSATION_ID = $1
        ORDER BY M.ID DESC
        LIMIT $2`, [conversationId, limit])
    
    return messageResponseSchema.array().parse(result.rows);
}