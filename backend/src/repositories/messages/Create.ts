import pool from "../../config/database";
import { CreateMessageDTO } from "../../types/messages";

export function Create (data: CreateMessageDTO) {
    return pool.query(
        `INSERT INTO MESSAGES (USER_ID, CONVERSATION_ID, CONTENT)
        VALUES ($1, $2, $3)`,
        [data.userId, data.conversationId, data.content]
    );
}