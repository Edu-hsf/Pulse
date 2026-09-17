import { z } from "zod";
import pool from "../../config/database";
import { conversationResponseSchema } from "../../types/conversation";

export async function GetAllByUserID(userId: number) {
  const result = await pool.query(
    `SELECT 
        C.id AS id, 
        C.created_at AS created_at, 
        C.deleted_at AS deleted_at, 
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
            M2.content AS message_content, 
            M2.created_at AS message_created_at, 
            M2.deleted_at AS message_deleted_at,
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
                MCP.REMOVED_BY AS participant_removed_at,
                MCP.ROLE AS participant_role,
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
        SELECT M.id, M.participant_id, M.content, M.created_at, M.deleted_at 
        FROM messages M
        WHERE M.conversation_id = C.id
        ORDER BY M.id DESC
        LIMIT 1
    ) M2 ON TRUE
    LEFT JOIN conversation_participants MCP
        ON MCP.id = M2.participant_id
    LEFT JOIN users U
        ON U.id = MCP.user_id
    LEFT JOIN message_attachments MATT
        ON MATT.message_id = M2.ID`,
    [userId],
  );

    const conversations = result.rows.map((row: any) => {
        const isGroup = row.is_group === true || row.is_group === "true";

        const baseConversation = {
            id: Number(row.id),
            createdAt: row.created_at,
            createdBy: row.created_by ? Number(row.created_by) : undefined,
            deletedAt: row.deleted_at ?? null,
            unreadMessages: Number(row.unread_messages ?? 0),
            settings: isGroup
                ? row.conversation_groups_settings
                : row.conversation_privates_settings,
            

        };

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
