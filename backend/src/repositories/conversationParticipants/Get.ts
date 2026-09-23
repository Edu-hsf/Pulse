import { z } from "zod";
import pool from "../../config/database";
import { conversationParticipantResponseSchema } from "../../types/conversationParticipant";

export async function GetByID(id: number) {
    const result = await pool.query(`
            SELECT
                CP.CONVERSATION_ID AS "conversationId", CP.USER_ID AS "userId", U.DELETED_AT AS "deletedAt" 
            FROM CONVERSATION_PARTICIPANTS CP
            INNER JOIN USERS U
                ON U.ID = CP.USER_ID
            WHERE CP.ID = $1
        `, [id])

    return result.rows[0];
}

export async function GetAllByConversationID(conversationId: number) {
    const result = await pool.query(
        `SELECT 
            MP.ID AS id,
                U.ID AS user_id,
                U.NAME AS user_name,
                U.EMAIL AS user_email,
                U.AVATAR AS user_avatar,
                U.CREATED_AT AS user_created_at,
                U.DELETED_AT AS user_deleted_at,
            MP.JOINED_AT AS joined_at,
            MP.LEFT_AT AS left_at,
            MP.ADD_BY AS add_by,
            MP.REMOVED_BY AS removed_at,
            MP.ROLE AS participant_role,
        FROM conversation_participants MP
        INNER JOIN conversations C
            ON C.ID = MP.conversation_id
        WHERE CP.conversation_id = $1`,
        [conversationId],
    );

    const participants = result.rows;

    return z.array(conversationParticipantResponseSchema).parse(participants);
}
