import { z } from "zod";
import pool from "../../config/database";
import { ConversationPrivateResponse, conversationResponseSchema } from "../../types/conversation";

export async function ExistsByID(id: number) {
    const result = await pool.query('SELECT ID FROM CONVERSATIONS WHERE ID = $1', [id])

    const conversation = result.rows[0];

    return conversation ? true : false;
}

export async function GetConversationByUserIdAndConversationId(userId: number, conversationId: number) {
    const result = await pool.query(`
        SELECT 
            C.ID 
        FROM CONVERSATIONS C 
        INNER JOIN CONVERSATION_PARTICIPANTS CP
            ON CP.conversation_id = C.ID
            AND CP.LEFT_AT IS NOT NULL
        WHERE CP.USER_iD = 36106 AND C.ID = 100
    `, [userId, conversationId])

    return result.rows[0];
}

export async function GetAllByUserID(userId: number) {
    const result = await pool.query(
        `SELECT 
            C.id AS id, 
            C.created_at AS created_at, 
            C.created_by AS created_by, 
            CASE
                WHEN CG.id IS NOT NULL THEN TRUE
                ELSE FALSE
            END AS is_group,
            CG.name AS conversation_groups_name,
            CG.description AS conversation_groups_description,
            CG.avatar AS conversation_groups_avatar,
            CG.settings AS conversation_groups_settings,
            CPV.settings AS conversation_privates_settings,
            M1.unread_messages,
                M2.id AS message_id, 
                    MCP.ID AS participant_id,
                        U.ID AS user_id,
                        U.NAME AS user_name,
                        U.EMAIL AS user_email,
                        U.AVATAR AS user_avatar,
                        U.CREATED_AT AS user_created_at,
                        U.DELETED_AT AS user_deleted_at,
                    MCP.JOINED_AT AS participant_joined_at,
                    MCP.LEFT_AT AS participant_left_at,
                    MCP.ADD_BY AS participant_add_by,
                    MCP.REMOVED_BY AS participant_removed_by,
                    MCP.ROLE AS participant_role,
                M2.content AS message_content, 
                M2.created_at AS message_created_at, 
                M2.deleted_at AS message_deleted_at,
                    MATT.ID AS attachment_id,
                    MATT.TYPE AS attachment_type,
                    MATT.URL AS attachment_url
        FROM conversationS C
        INNER JOIN conversation_participants CP
            ON CP.conversation_id = C.id 
            AND CP.user_id = $1
        LEFT JOIN conversation_groups CG
            ON CG.conversation_id = C.id
        LEFT JOIN conversation_privates CPV
            ON CPV.conversation_id = C.id
        LEFT JOIN LATERAL (
            SELECT COUNT(M.id) AS unread_messages FROM messages M
            WHERE M.id > CP.last_read_message_id AND M.conversation_id = C.id
            LIMIT 1
        ) M1 ON TRUE
        LEFT JOIN LATERAL (
            SELECT M.id, M.CREATED_BY, M.content, M.created_at, M.deleted_at 
            FROM messages M
            WHERE M.conversation_id = C.id
            ORDER BY M.id DESC
            LIMIT 1
        ) M2 ON TRUE
        LEFT JOIN conversation_participants MCP
            ON MCP.id = M2.CREATED_BY
        LEFT JOIN users U
            ON U.id = MCP.user_id
        LEFT JOIN message_attachments MATT
            ON MATT.message_id = M2.ID`,
        [userId],
    );

    const conversations = result.rows.map((row: any) => {
        const isGroup = row.is_group === true || row.is_group === "true";

        const baseConversation: ConversationPrivateResponse = {
            id: Number(row.id),
            createdAt: row.created_at,
            createdBy: Number(row.created_by),
            unreadMessages: Number(row.unread_messages ?? 0),
            settings: isGroup
                ? row.conversation_groups_settings
                : row.conversation_privates_settings,
            lastMessage: row.message_id ? {
                id: Number(row.message_id),
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
                    joinedAt: new Date(row.participant_joined_at),
                    leftAt: row.participant_left_at,
                    addBy: row.participant_add_by ? Number(row.participant_add_by) : null,
                    removedBy: row.participant_removed_by ? Number(row.participant_removed_by) : null,
                },
                content: row.message_content,
                createdAt: row.message_created_at,
                deletedAt: row.message_deleted_at ? new Date(row.message_deleted_at) : null,
                attachment: row.attachment_id ? {
                    id: Number(row.attachment_id),
                    type: row.attachment_type,
                    url: row.attachment_url,
                } : null,      
            } : null,
        }

        if (isGroup) {
            return {
            ...baseConversation,
            name: row.conversation_groups_name,
            description: row.conversation_groups_description,
            avatar: row.conversation_groups_avatar,
            };
        }

        return baseConversation;
    });

    return z.array(conversationResponseSchema).parse(conversations);
}
