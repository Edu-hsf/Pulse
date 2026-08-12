import pool from "../../config/database";
import { Message } from "../../types/messages";

export async function GetByID (id: number) {
    const result = await pool.query('SELECT * FROM MESSAGES WHERE ID = $1', [id])
    
    return (result.rows[0] as Message | undefined) ?? null;
}

export async function GetAllByConversationID (id: number) {
    const result = await pool.query(`
        SELECT * FROM MESSAGES
        WHERE CONVERSATION_ID = $1`, [id])
    
    return result.rows as Message[];
}