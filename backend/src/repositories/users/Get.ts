import pool from "../../config/database";
import { User } from "../../types/user";

export async function GetByID(id: number) {
    const result = await pool.query('SELECT ID, NAME, EMAIL, AVATAR, CREATED_AT, DELETED_AT FROM USERS WHERE ID = $1', [id])
    
    return (result.rows[0] as User | undefined) ?? null;
}

export async function GetByEmail(email: string) {
    const result = await pool.query('SELECT ID, NAME, EMAIL, AVATAR, CREATED_AT, DELETED_AT FROM USERS WHERE EMAIL = LOWER($1)', [email])

    return (result.rows[0] as User | undefined) ?? null;
}