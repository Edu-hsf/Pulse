import pool from "../../config/database";
import { MessageResponse, messageResponseSchema } from "../../types/message";

export async function ExistsByID(id: number) {
    const result = await pool.query('SELECT ID FROM MESSAGES WHERE ID = $1', [id]);

    const message = result.rows[0]

    return message ? true : false
}

export async function GetMessageByUserIdAndMessageId(userId: number, messageId: number) {
    const result = await pool.query(`
        SELECT 
            M.ID 
        FROM MESSAGES M
        INNER JOIN CONVERSATION_PARTICIPANTS CP
            ON CP.ID = M.CREATED_BY
            AND CP.
        WHERE CP.USER_ID = $1 AND M.ID = $2`, [userId, messageId]);

    const message = result.rows[0]

    return message ? true : false
}

export async function GetMessagesByConversationID (conversationId: number, limit: number, cursor?: number) {
    const result = cursor ? 
        await pool.query(`
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
                M.CONTENT AS content,
                M.CREATED_AT AS created_at,
                M.DELETED_AT AS deleted_at,
                    ATT.ID AS attachment_id,
                    ATT.TYPE AS attachment_type,
                    ATT.URL AS attachment_url
            FROM MESSAGES M
            LEFT JOIN CONVERSATION_PARTICIPANTS CP
                ON CP.ID = M.CREATED_BY
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
                M.CONTENT AS content,
                M.CREATED_AT AS created_at,
                M.DELETED_AT AS deleted_at,
                    ATT.ID AS attachment_id,
                    ATT.TYPE AS attachment_type,
                    ATT.URL AS attachment_url
            FROM MESSAGES M
            LEFT JOIN CONVERSATION_PARTICIPANTS CP
                ON CP.ID = M.CREATED_BY
            LEFT JOIN USERS U
                ON U.ID = CP.USER_ID
            LEFT JOIN MESSAGE_ATTACHMENTS ATT
                ON ATT.MESSAGE_ID = M.ID
            WHERE M.CONVERSATION_ID = $1
            ORDER BY M.ID DESC
            LIMIT $2`, [conversationId, limit])

    const messages = result.rows.map((row: any) => {
        const message: MessageResponse = {
            id: Number(row.id),
            participant: {
                id: Number(row.created_by),
                user: {
                    id: Number(row.user_id),
                    name: row.user_name,
                    email: row.user_email,
                    avatar: row.user_avatar,
                    createdAt: row.user_created_at,
                    deletedAt: row.user_deleted_at,
                },
                role: row.participant_role,
                joinedAt: row.participant_joined_at,
                leftAt: row.participant_left_at,
                addBy: row.participant_add_by,
                removedBy: row.participant_removed_at,
            },
            content: row.content,
            createdAt: row.created_by,
            deletedAt: row.deleted_at,
            attachment: row.attachment_id ? {
                id: Number(row.attachment_id),
                type: row.attachment_type,
                url: row.attachment_url,
            } : null,
        }

        return message;
    });
    
    return messageResponseSchema.array().parse(messages);
}