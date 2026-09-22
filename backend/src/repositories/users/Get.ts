import pool from "../../config/database";
import { userPayloadSchema, userResponseSchema } from "../../types/user";

export async function GetByID(id: number) {
    const result = await pool.query(`
        SELECT 
            ID AS id, 
            NAME AS name, 
            EMAIL AS email, 
            AVATAR AS avatar, 
            CREATED_AT AS "createdAt", 
            DELETED_AT AS "deletedAt" 
        FROM USERS 
        WHERE ID = $1`,  [id]);

    const user = result.rows[0];

    return user ? userResponseSchema.parse(user) : null;
}

export async function GetByEmail(email: string) {
    const result = await pool.query(`
        SELECT 
            ID AS sub,
            NAME AS name,
            DELETED_AT AS "deletedAt",
            PASSWORD_HASH AS "passwordHash"
        FROM USERS 
        WHERE LOWER(EMAIL) = LOWER($1)
        ORDER BY ID DESC
        LIMIT 1
    `, [email])

    const user = result.rows[0];

    return user ? userPayloadSchema.parse(user) : null;
}