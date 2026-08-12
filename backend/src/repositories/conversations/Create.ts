import pool from "../../config/database";
import { CreateConversationDTO } from "../../types/conversations";

export function Create (data: CreateConversationDTO) {
    return pool.query(
        `INSERT INTO CONVERSATIONS (USER_ADMIN_ID, CREATED_BY)
        VALUES ($1, $2)`,
        [data.userAdminId, data.userAdminId]
    );
}