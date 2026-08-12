import pool from "../../config/database";
import { Conversation } from "../../types/conversations";

export async function GetByID (id: number) {
    const result = await pool.query('SELECT ID, USER_ADMIN_ID, CREATED_AT, CREATED_BY FROM CONVERSATIONS WHERE ID = $1', [id])
    
    return (result.rows[0] as Conversation | undefined) ?? null;
}

export async function GetAllByUserID (id: number) {
    const result = await pool.query(`
        SELECT C.ID, C.USER_ADMIN_ID, C.CREATED_AT, C.CREATED_BY FROM CONVERSATIONS AS C 
        INNER JOIN CONVERSATION_PARTICIPANTS AS CP 
            ON CP.CONVERSATION_ID = C.ID
        WHERE CP.USER_ID = $1`, [id])
    
    return result.rows as Conversation[];
}