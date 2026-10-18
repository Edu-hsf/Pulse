import { z } from 'zod';
import pool from '../../config/database';
import { conversationParticipantResponseSchema } from '../../types/conversationParticipant';

export async function GetByID(id: number) {
    const result = await pool.query(`
            SELECT
                CP.CONVERSATION_ID AS "conversationId", 
                CP.USER_ID AS "userId", 
                U.DELETED_AT AS "deletedAt",
                CP.LEFT_AT AS "leftAt"
            FROM CONVERSATION_PARTICIPANTS CP
            INNER JOIN USERS U
                ON U.ID = CP.USER_ID
            WHERE CP.ID = $1
        `, [id]);

    return result.rows[0];
}

export async function ExistsByUserIDAndConversationID(userId: number, conversationId: number) {
    const result = await pool.query(`
        SELECT
            CP.ID AS "id"
        FROM CONVERSATION_PARTICIPANTS CP
        WHERE CP.USER_ID = $1 AND CP.CONVERSATION_ID = $2
    `, [userId, conversationId]);

    return result.rows[0] ? true : false;
}

export async function GetAllByConversationID(conversationId: number) {
    const result = await pool.query(`
        SELECT 
            CP.ID AS id,
            U.ID AS user_id,
            U.NAME AS user_name,
            U.EMAIL AS user_email,
            U.AVATAR AS user_avatar,
            U.CREATED_AT AS user_created_at,
            U.DELETED_AT AS user_deleted_at,
            CP.JOINED_AT AS joined_at,
            CP.LEFT_AT AS left_at,
            CP.ADD_BY AS add_by,
            CP.REMOVED_BY AS removed_by,
            CP.ROLE AS participant_role
        FROM conversation_participants CP
        INNER JOIN conversations C
            ON C.ID = CP.CONVERSATION_ID
        INNER JOIN users U
            ON U.ID = CP.USER_ID
        WHERE CP.CONVERSATION_ID = $1
    `, [conversationId],
    );
  
    const participants = result.rows.map((row) => ({
        id: Number(row.id),
        user: {
            id: Number(row.user_id),
            name: row.user_name,
            email: row.user_email,
            avatar: row.user_avatar,
            createdAt: row.user_created_at,
            deletedAt: row.user_deleted_at,
        },
        joinedAt: row.joined_at,
        leftAt: row.left_at,
        addBy: row.add_by === null ? null : Number(row.add_by),
        removedBy: row.removed_by === null ? null : Number(row.removed_by),
        role: row.participant_role,
    }));

    return z.array(conversationParticipantResponseSchema).parse(participants);
}
