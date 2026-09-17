import argon2 from "argon2";
import pool from "../../config/database";
import { UserResponse, UserWithPassword } from "../../types/user";

export async function GetByEmail(email: string) {
    const result = await pool.query('SELECT ID, NAME, EMAIL, AVATAR, CREATED_AT, DELETED_AT FROM USERS WHERE EMAIL = LOWER($1)', [email])

    return (result.rows[0] as UserResponse | undefined) ?? null;
}

export async function GetByEmailAndPassword(email: string, password: string) {
     const result = await pool.query(
        `SELECT ID, NAME, EMAIL, AVATAR, PASSWORD_HASH, CREATED_AT, DELETED_AT
         FROM USERS
         WHERE EMAIL = LOWER($1)`,
        [email]
    );

    const user = result.rows[0] as UserWithPassword;

    if (!user) {
        return null;
    }

    const valid = await argon2.verify(
        user.passwordHash,
        password
    );

    if (!valid) {
        return null;
    }

    return user as UserResponse;
}